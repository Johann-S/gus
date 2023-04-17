export interface GithubUser {
  avatar_url: string
  bio: string | null
  blog: string | null
  company: string | null
  createdAt: string
  followers: number
  following: number
  hireable: boolean
  url: string
  id: number
  location: string | null
  login: string
  name: string | null
  gists: number
  repos: number
}
