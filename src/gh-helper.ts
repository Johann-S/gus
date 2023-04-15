import axios from 'axios'

import { ghApiVersion, ghBaseUrl } from '@root/const'

export const ghUserSearch = async (
  search: string,
  resultPerPage = 50
): Promise<any> => {
  try {
    const baseUrl = `${ghBaseUrl}/search/users`
    const { data } = await axios.get(
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
