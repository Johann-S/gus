import axios from 'axios'
import parseLinkHeader from 'parse-link-header'

/** Root */
import { ghApiVersion, ghBaseUrl, ghToken } from '@root/const'

/** Models */
import { type GithubResultSearch } from '@models/github-result.search.model'
import { type UserPagination } from '@models/user-pagination.model'

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
  data: GithubResultSearch, link: string | null
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
    totalPages: Number(last.page)
  }
}

export const ghUserSearch = async (
  search: string,
  page = 1,
  resultPerPage = 50
): Promise<UserPagination | null> => {
  try {
    const params = {
      page,
      q: search,
      per_page: resultPerPage
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
      data,
      headers.link
    )

    sessionStorage.setItem(stringyfiedParams, JSON.stringify(pagination))

    return pagination
  } catch (error) {
    return null
  }
}
