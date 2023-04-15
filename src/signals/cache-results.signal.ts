import { signal } from '@preact/signals-react'

/** Models */
import { type GithubUser } from '@models/github-user.model'

export const sigCacheResults = signal<GithubUser[]>([])

export const updateCacheResults = (lastResults: GithubUser[]): void => {
  const updatedArr = lastResults.concat(sigCacheResults.value)
    .filter((user: GithubUser, index: number, filteringArr: GithubUser[]) => {
      return index === filteringArr.findIndex(
        (fIndexUser: GithubUser) => user.id === fIndexUser.id
      )
    })

  sigCacheResults.value = updatedArr
}
