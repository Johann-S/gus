import React from 'react'
import { computed } from '@preact/signals-react'
import { MdOutlineYoutubeSearchedFor } from 'react-icons/md'

/** Root */
import { sigCacheResults } from '@root/signals/cache-results.signal'
import { sigCacheSearch } from '@root/signals/cache-search.signal'

/** Models */
import { type GithubUser } from '@models/github-user.model'

export const typeaheadOptions = computed(() => {
  const options = [] as JSX.Element[]

  sigCacheSearch.value.forEach((search: string) => {
    options.push((
      <div key={Date.now()}>
        <MdOutlineYoutubeSearchedFor />
        <span>{search}</span>
      </div>
    ))
  })

  sigCacheResults.value.forEach((value: GithubUser) => {
    options.push((
      <div key={value.id}>
        <img
          alt={value.login}
          src={value.avatar_url}
          style={{
            height: '24px',
            marginRight: '10px',
            width: '24px'
          }}
        />
        <span>{value.login}</span>
      </div>
    ))
  })

  return options
})
