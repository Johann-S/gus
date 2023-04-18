# GUS

[![Node.js CI](https://github.com/Johann-S/gus/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Johann-S/gus/actions/workflows/node.js.yml)


Github User Search (GUS), available here: https://gus-johann-s.netlify.app/

## Highlights

- HTTP calls results are cached using the session storage
- I took the best of the REST API and GraphQL API
- Images are preloaded on scroll to avoid unnecessary loading.
- Good responsiveness to support different screen sizes
- CSS is purged using PurgeCSS to keep only what's used in the application
- Several filters are available (Best matches, Followers, Repositories and Joined)
- Keep track of the previous research you made and suggest them
- Indicate API limits
- User profile page

## Most proud of

Here I tried to focus more on improving the app size to deliver a fast loading app and an optimized one.

### Pagination

At the beginning I only used Github REST API and there was a big drawback, the number of API Calls.
When a search was made, asking for 20 results, the application made 21 requests. 1 to do the search and 20 for users.
I stored as many results as possible, but the Github API has limitations. For example without an API token you can only make **10** searches and **50** calls to user profiles. Using an API token helps a bit but it wasn't enough.
I first tried to only use GraphQL API, but in terms of functionality it was a step back compared to the version using the REST API. Users won't be able to navigate to a specific page because of Github GraphQL API.
Finally a idea comes up, maybe I can use the best of the two worlds, good pagination using the REST API and good resources management using the GraphQL API!
The application now uses the REST API search route and GraphQL API to load profile information.

## What's next?

- Improve the current profile page to add more data (contributions map, list of contributions)
- Add a way to browse repositories, followers, and followed accounts.
- Localization
- Better error handler
