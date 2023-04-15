import { type GithubUser } from '@models/github-user.model'

export interface GithubResultSearch {
  incomplete_results: boolean
  items: GithubUser[]
  total_count: number
}
