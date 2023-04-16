import React, { useState } from 'react'

/** Root */
import { ghUserSearch } from '@root/gh-helper'

/** Components */
import { Typeahead } from '@root/components/typeahead'
import { SearchResults } from '@root/components/search-results'

/** Models */
import { type UserPagination } from '@models/user-pagination.model'

/** Signals */
import { updateCacheSearch } from '@root/signals/cache-search.signal'
import { updateCacheResults } from '@root/signals/cache-results.signal'

export const Search = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [totalDisplay] = useState(50)
  const [results, setResults] = useState(
    { items: [] } as unknown as UserPagination
  )
  const searchFn = async (
    str: string,
    page: number,
    totalItems = totalDisplay
  ): Promise<UserPagination | null> => {
    setIsLoading(true)
    const result = await ghUserSearch(str, page, totalItems)

    if (result) {
      updateCacheSearch(str)
      updateCacheResults(result.items)
      setResults(result)
    }

    setIsLoading(false)

    return result
  }

  return (
    <div className="container-fluid">
      <Typeahead
        isLoading={isLoading}
        search={(searchStr: string, page: number) => { void searchFn(searchStr, page) }}
      />
      <SearchResults
        isLoading={isLoading}
        results={results}
        search={(searchStr: string, page: number) => { void searchFn(searchStr, page) }}
      />
    </div>
  )
}
