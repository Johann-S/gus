import axios from 'axios'

/** Root */
import { ghApiVersion, ghBaseUrl } from '@root/const'

/** Models */
import { type GithubResultSearch } from '@models/github-result.search.model'

export const ghUserSearch = async (
  search: string,
  resultPerPage = 50
): Promise<GithubResultSearch | null> => {
  try {
    const baseUrl = `${ghBaseUrl}/search/users`
    const { data } = await axios.get<GithubResultSearch>(
      baseUrl,
      {
        params: {
          q: search,
          per_page: resultPerPage
        },
        headers: {
          'X-GitHub-Api-Version': ghApiVersion
        }
      }
    )

    return data
  } catch (error) {
    return null
  }
}
