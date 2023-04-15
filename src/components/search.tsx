import React, { useState } from 'react'

/** Root */
import { Typeahead } from '@root/components/typeahead'
import { SearchResults } from './search-results'
import { type GithubResultSearch } from '@models/github-result.search.model'

export const Search = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(
    { items: [] } as unknown as GithubResultSearch
  )

  return (
    <div className="container-fluid">
      <Typeahead
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setResults={setResults}
      />
      <SearchResults results={results} />
    </div>
  )
}
