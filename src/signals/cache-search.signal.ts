import { signal } from '@preact/signals-react'

export const sigCacheSearch = signal<string[]>([])

export const updateCacheSearch = (lastSearch: string): void => {
  const updateArr = [...sigCacheSearch.value]

  if (updateArr.includes(lastSearch)) {
    const indexSearch = updateArr.indexOf(lastSearch)

    updateArr.splice(indexSearch, 1)
  }

  updateArr.push(lastSearch)
  sigCacheSearch.value = updateArr
}
