import { gql } from '@apollo/client'

export const queryUserNodes = gql`
query($nodes: [ID!]!) {
  nodes(ids: $nodes) {
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
`
