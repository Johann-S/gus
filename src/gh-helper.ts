import axios from 'axios'
import parseLinkHeader, { type Link } from 'parse-link-header'

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

  if (!paginationParsed) {
    return {
      search,
      currentPage,
      totalItems: data.total_count,
      totalPages: 1,
      items: data.items
    }
  }

  const last = paginationParsed.last

  return {
    search,
    currentPage,
    totalItems: data.total_count,
    totalPages: Number((last as Link).page),
    items: data.items
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

    sessionStorage.setItem(JSON.stringify(params), JSON.stringify(pagination))

    return pagination
  } catch (error) {
    return null
  }
}
