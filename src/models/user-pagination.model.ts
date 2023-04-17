import { type GithubUser } from './github-user.model'

export interface UserPagination {
  search: string
  totalItems: number
  currentPage: number
  totalPages: number
  items: GithubUser[]
}
