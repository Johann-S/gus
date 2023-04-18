import React, { useState, useEffect } from 'react'

/** Root */
import { ghUserSearch } from '@root/gh-helper'

/** Components */
import { Typeahead } from '@root/components/typeahead'
import { SearchResults } from '@root/components/search-results'

/** Models */
import { type UserPagination } from '@models/user-pagination.model'
import { type SearchData } from '@models/search-data.model'
import { FilterResults } from '@models/filter-results.enum'

/** Signals */
import { sigCacheSearch } from '@root/signals/cache-search.signal'

export const Search = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchStr, setSearchStr] = useState('')
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
      setResults(result)
    }

    setIsLoading(false)

    return result
  }

  useEffect(
    () => {
      const lastSearch = [...sigCacheSearch.value].pop()

      if (!lastSearch) {
        return
      }

      const filter = lastSearch.sort ? lastSearch.sort : FilterResults.BestMatch

      setTotalDisplay(lastSearch.per_page)
      setFilterResults(filter)
      setSearchStr(lastSearch.q)
      void searchFn(
        lastSearch.q,
        lastSearch.page,
        lastSearch.per_page,
        filter
      )
    },
    []
  )

  return (
    <div className="container-fluid">
      <Typeahead
        isLoading={isLoading}
        searchStr={searchStr}
        setSearchStr={(newSearch: string) => { setSearchStr(newSearch) }}
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
          void searchFn(([...sigCacheSearch.value].pop() as SearchData).q, 1, total)
        }}
        setFilterResults={(newFilter: string) => {
          setFilterResults(newFilter)
          void searchFn(([...sigCacheSearch.value].pop() as SearchData).q, 1, totalDisplay, newFilter)
        }}
      />
    </div>
  )
}
