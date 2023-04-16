export interface RawUser {
  databaseId: number
  login: string
  avatarUrl: string
  bio: string | null
  company: string | null
  createdAt: string
  followers: {
    totalCount: number
  }
  following: {
    totalCount: number
  }
  gists: {
    totalCount: number
  }
  isHireable: boolean
  location: string | null
  name: string | null
  repositories: {
    totalCount: number
  }
  url: string
  websiteUrl: string | null
}

export interface ResultRawUserSearch {
  search: {
    userCount: number
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      endCursor: string
      startCursor: string
    }
    nodes: RawUser[]
  }
}
