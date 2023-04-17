# GUS

[![Node.js CI](https://github.com/Johann-S/gus/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Johann-S/gus/actions/workflows/node.js.yml)


Github User Search (GUS), available here: https://gus-johann-s.netlify.app/

## Highlights

- HTTP calls results are cached using the session storage
- I took the best of the REST API and GraphQL API
- Images are preloaded on scroll to load only what's necessary
- Good responsiveness to support different screen sizes
- CSS is purged using PurgeCSS to keep only what's used in the application
- Several filters are available (Best matches, Followers, Repositories and Joined)
- Keep track of the previous research you made and suggest them

## Most proud of

Here I tried to focus more on improving the app size to deliver a fast loading app and an optimized one.

### Pagination

At the beginning I only used Github REST API and there was a big drawback, the number of API Calls.
When a search was made, asking for 20 results, the application made 21 requests. 1 to do the search and 20 for users.
I stored results as much as possible but Github API as limitations, for example without an API token you can only make **10** searches and **50** calls to user profiles. Using an API token helps a bit but it wasn't enough.
I first tried to only use GraphQL API, but in terms of functionality it was a step back compared to the version using the REST API. Users won't be able to navigate to a specific page because of Github GraphQL API.
Finally a idea comes up, maybe I can use the best of the two worlds, good pagination using the REST API and good resources management using the GraphQL API!
Now the application will use the search route of the REST API and will load profile information using the GraphQL API.

## What's next?

- Another page for github users to display more information

