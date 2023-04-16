import { gql } from '@apollo/client'

export const queryUser = gql`
query ($search: String!, $count: Int) {
  search(query: $search, type: USER, first: $count) {
    userCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    nodes {
      ... on User {
        databaseId
        login
        avatarUrl
        bio
        company
        createdAt
        followers {
          totalCount
        }
        following {
          totalCount
        }
        gists {
          totalCount
        }
        isHireable
        location
        name
        repositories {
          totalCount
        }
        url
        websiteUrl
      }
    }
  }
}
`
