export interface RawOrganization {
  databaseId: number
  name: string
  avatarUrl: string
  url: string
}

export interface RawLanguage {
  id: string
  name: string
  color: string
}

export interface RawPinnedRepository {
  databaseId: number
  name: string
  description: string
  forkCount: number
  stargazerCount: number
  url: string
  languages: {
    nodes: any[]
  }
}

export interface RawUserProfile {
  databaseId: number
  login: string
  avatarUrl: string
  bioHTML: string | null
  company: string | null
  followers: { totalCount: number }
  following: { totalCount: number }
  gists: { totalCount: number }
  location: string | null
  name: string | null
  repositories: {
    totalCount: number
  }
  url: string
  websiteUrl: string | null
  organizations: {
    nodes: RawOrganization[]
  }
  pinnedItems: {
    nodes: RawPinnedRepository[]
  }
}

export interface ResultRawUserProfile {
  user: RawUserProfile
}
