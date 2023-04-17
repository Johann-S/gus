import axios from 'axios'
import parseLinkHeader from 'parse-link-header'
import { ApolloClient, InMemoryCache } from '@apollo/client'

/** Root */
import {
  ghApiVersion,
  ghRestUrl,
  ghGraphQlUrl,
  ghRestToken,
  ghGraphToken
} from '@root/const'
import { queryUserNodes } from '@root/query/query-user-nodes'

/** Models */
import { type GithubResultSearch } from '@models/github-result.search.model'
import { type UserPagination } from '@models/user-pagination.model'
import { type GithubUser } from '@models/github-user.model'
import { type GithubUserRest } from '@models/github-user-rest.model'
import { FilterResults } from '@models/filter-results.enum'
import { type RawUser, type ResultRawUserNodes } from '@models/result-raw-user-nodes.model'

const githubClient = axios.create({
  baseURL: ghRestUrl,
  headers: {
    'X-GitHub-Api-Version': ghApiVersion,
    Authorization: `token ${ghRestToken}`
  }
})

const ghGraphQlClient = new ApolloClient({
  uri: ghGraphQlUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${ghGraphToken}`
  }
})

const buildUserPagination = (
  search: string,
  currentPage: number,
  items: GithubUser[],
  totalItems: number,
  link: string | null
): UserPagination => {
  const paginationParsed = parseLinkHeader(link)
  const defaultPagination = {
    search,
    currentPage,
    items,
    totalItems
  }

  if (!paginationParsed) {
    return {
      ...defaultPagination,
      totalPages: 1
    }
  }

  const last = paginationParsed.last

  if (!last) {
    return {
      ...defaultPagination,
      totalPages: currentPage
    }
  }

  return {
    ...defaultPagination,
    totalPages: Number(last.page)
  }
}

const mapRawUserList = (rawUserList: RawUser[]): GithubUser[] => {
  return rawUserList
    .filter((rawUser: RawUser) => Object.keys(rawUser).length > 2)
    .map(
      (rawUser: RawUser) => ({
        avatar_url: rawUser.avatarUrl,
        bio: rawUser.bio,
        blog: rawUser.websiteUrl,
        company: rawUser.company,
        createdAt: rawUser.createdAt,
        followers: rawUser.followers.totalCount,
        following: rawUser.following.totalCount,
        gists: rawUser.gists.totalCount,
        hireable: rawUser.isHireable,
        url: rawUser.url,
        id: rawUser.databaseId,
        location: rawUser.location,
        login: rawUser.login,
        name: rawUser.name,
        repos: rawUser.repositories.totalCount
      })
    )
}

export const ghUserSearch = async (
  search: string,
  page: number,
  resultPerPage: number,
  sort: string
): Promise<UserPagination | null> => {
  try {
    const params = {
      page,
      q: search,
      per_page: resultPerPage,
      sort: sort === FilterResults.BestMatch ? undefined : sort
    }
    const stringyfiedParams = JSON.stringify(params)

    if (sessionStorage.getItem(stringyfiedParams)) {
      return JSON.parse(sessionStorage.getItem(stringyfiedParams) as string)
    }

    const { data, headers } = await githubClient.get<GithubResultSearch>(
      '/search/users',
      { params }
    )
    const nodeList = data.items.map((mGhUser: GithubUserRest) => mGhUser.node_id)
    const { data: dataGraphQL } = await ghGraphQlClient.query<ResultRawUserNodes>({
      query: queryUserNodes,
      variables: { nodes: nodeList }
    })
    const userList = mapRawUserList(dataGraphQL.nodes)

    const pagination = buildUserPagination(
      search,
      page,
      userList,
      data.total_count,
      headers.link
    )

    sessionStorage.setItem(stringyfiedParams, JSON.stringify(pagination))

    return pagination
  } catch (error) {
    return null
  }
}
