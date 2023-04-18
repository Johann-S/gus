import { signal } from '@preact/signals-react'

/** Models */
import { type SearchData } from '@models/search-data.model'

export const sigCacheSearch = signal<SearchData[]>([])

export const updateCacheSearch = (lastSearch: SearchData): void => {
  const updateArr = [...sigCacheSearch.value]
  const stringCacheSearchArr = sigCacheSearch.value.map((mSearchData: SearchData) => JSON.stringify(mSearchData))
  const stringLastSearch = JSON.stringify(lastSearch)

  if (stringCacheSearchArr.includes(stringLastSearch)) {
    const indexSearch = stringCacheSearchArr.indexOf(stringLastSearch)

    updateArr.splice(indexSearch, 1)
  }

  updateArr.push(lastSearch)
  sigCacheSearch.value = updateArr
}
