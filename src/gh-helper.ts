import { ApolloClient, InMemoryCache } from '@apollo/client'

/** Root */
import { ghGraphQlUrl, ghToken } from '@root/const'

/** Models */
import { type UserPagination } from '@models/user-pagination.model'
import { type RawUser, type ResultRawUserSearch } from '@models/result-raw-user-search'
import { FilterResults } from '@models/filter-results.enum'
import { type GithubUser } from '@models/github-user.model'

/** Queries */
import { queryUser } from '@root/query/query-user'

const ghGraphQlClient = new ApolloClient({
  uri: ghGraphQlUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${ghToken}`
  }
})

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

const buildUserPagination = (
  searchStr: string,
  currentPage: number,
  resultRaw: ResultRawUserSearch
): UserPagination => {
  const { search } = resultRaw
  const defaultPagination = {
    currentPage,
    search: searchStr,
    totalItems: search.userCount,
    items: mapRawUserList(search.nodes)
  }

  if (defaultPagination.totalItems === defaultPagination.items.length) {
    return {
      ...defaultPagination,
      totalPages: 1
    }
  }

  if (!search.pageInfo.hasNextPage) {
    return {
      ...defaultPagination,
      totalPages: currentPage
    }
  }

  return {
    ...defaultPagination,
    totalPages: Math.ceil(defaultPagination.totalItems / defaultPagination.items.length)
  }
}

export const ghUserSearch = async (
  search: string,
  page: number,
  resultPerPage: number,
  sort: string
): Promise<UserPagination | null> => {
  try {
    const searchSort = FilterResults.BestMatch === sort
      ? search
      : `${search} sort:${sort}`
    const params = {
      search: searchSort,
      count: resultPerPage
    }

    const stringyfiedParams = JSON.stringify(params)

    if (sessionStorage.getItem(stringyfiedParams)) {
      return JSON.parse(sessionStorage.getItem(stringyfiedParams) as string)
    }

    const { data } = await ghGraphQlClient.query<ResultRawUserSearch>({
      query: queryUser,
      variables: params
    })

    const pagination = buildUserPagination(
      search,
      page,
      data
    )

    sessionStorage.setItem(stringyfiedParams, JSON.stringify(pagination))

    return pagination
  } catch (error) {
    console.error(error)

    return null
  }
}
