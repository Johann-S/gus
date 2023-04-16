import React, { useState } from 'react'

/** Root */
import { ghUserSearch } from '@root/gh-helper'

/** Components */
import { Typeahead } from '@root/components/typeahead'
import { SearchResults } from '@root/components/search-results'

/** Models */
import { type UserPagination } from '@models/user-pagination.model'
import { FilterResults } from '@models/filter-results.enum'

/** Signals */
import { sigCacheSearch, updateCacheSearch } from '@root/signals/cache-search.signal'

export const Search = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [totalDisplay, setTotalDisplay] = useState(20)
  const [filterResults, setFilterResults] = useState(FilterResults.BestMatch as string)
  const [results, setResults] = useState(
    { items: [] } as unknown as UserPagination
  )
  const searchFn = async (
    str: string,
    page: number,
    totalItems = totalDisplay,
    filter = filterResults
  ): Promise<UserPagination | null> => {
    setIsLoading(true)
    const result = await ghUserSearch(str, page, totalItems, filter)

    if (result) {
      updateCacheSearch(str)
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
        totalDisplay={totalDisplay}
        filterResults={filterResults}
        search={(searchStr: string, page: number) => { void searchFn(searchStr, page) }}
        setTotalDisplay={(total: number) => {
          setTotalDisplay(total)
          void searchFn([...sigCacheSearch.value].pop() as string, 1, total)
        }}
        setFilterResults={(newFilter: string) => {
          setFilterResults(newFilter)
          void searchFn([...sigCacheSearch.value].pop() as string, 1, totalDisplay, newFilter)
        }}
      />
    </div>
  )
}
