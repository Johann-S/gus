import { gql } from '@apollo/client'

export const queryUserByLogin = gql`
query($login: String!) {
  user(login: $login) {
    databaseId
    login
    avatarUrl
    bioHTML
    company
    followers {
      totalCount
    }
    following {
      totalCount
    }
    gists {
      totalCount
    }
    location
    name
    repositories {
      totalCount
    }
    url
    websiteUrl
    organizations(first: 4) {
      nodes {
        databaseId
        name
        avatarUrl
        url
      }
    }
    pinnedItems(first: 4) {
      ... on PinnableItemConnection {
        nodes {
          ... on Repository {
            databaseId
            name
            description
            forkCount
            stargazerCount
            url
            languages(first: 2) {
              nodes {
                id
                color
                name
              }
            }
          }
        }
      }
    }
  }
}
`
