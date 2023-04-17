import { type GithubUserRest } from '@models/github-user-rest.model'

export interface GithubResultSearch {
  incomplete_results: boolean
  items: GithubUserRest[]
  total_count: number
}
