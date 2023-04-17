interface RateLimitValues {
  limit: number
  used: number
  remaining: number
  reset: number
}

export interface RateLimit {
  resources: {
    graphql: RateLimitValues
    search: RateLimitValues
  }
}
