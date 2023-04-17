import axios from 'axios'
import parseLinkHeader from 'parse-link-header'

/** Root */
import { ghApiVersion, ghBaseUrl, ghToken } from '@root/const'

/** Models */
import { type GithubResultSearch } from '@models/github-result.search.model'
import { type UserPagination } from '@models/user-pagination.model'
import { type GithubUserProfile } from '@models/github-user-profile.model'
import { FilterResults } from '@models/filter-results.enum'

const githubClient = axios.create({
  baseURL: ghBaseUrl,
  headers: {
    'X-GitHub-Api-Version': ghApiVersion,
    Authorization: `token ${ghToken}`
  }
})

const buildUserPagination = (
  search: string,
  currentPage: number,
  resultPerPage: number,
  data: GithubResultSearch,
  link: string | null
): UserPagination => {
  const paginationParsed = parseLinkHeader(link)
  const defaultPagination = {
    search,
    currentPage,
    totalItems: data.total_count,
    items: data.items
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
    totalPages: Math.ceil(defaultPagination.totalItems / resultPerPage)
  }
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

    const pagination = buildUserPagination(
      search,
      page,
      resultPerPage,
      data,
      headers.link
    )

    sessionStorage.setItem(stringyfiedParams, JSON.stringify(pagination))

    return pagination
  } catch (error) {
    return null
  }
}

export const ghUserProfile = async (name: string): Promise<GithubUserProfile | null> => {
  try {
    if (sessionStorage.getItem(name)) {
      return JSON.parse(sessionStorage.getItem(name) as string)
    }

    const { data } = await githubClient.get<GithubUserProfile>(`/users/${name}`)

    sessionStorage.setItem(name, JSON.stringify(data))

    return data
  } catch (error) {
    return null
  }
}
