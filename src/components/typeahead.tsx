import React, { type KeyboardEvent, useState } from 'react'
import { Typeahead as TypeaheadLib } from 'react-bootstrap-typeahead'
import { FcSearch } from 'react-icons/fc'

/** Root */
import { sigCacheResults, updateCacheResults } from '@root/signals/cache-results.signal'
import { updateCacheSearch } from '@root/signals/cache-search.signal'
import { ghUserSearch } from '@root/gh-helper'

/** Models */
import { type GithubResultSearch } from '@models/github-result.search.model'

interface Props {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  setResults: (results: GithubResultSearch) => void
}

export const Typeahead = (props: Props): JSX.Element => {
  const { isLoading, setIsLoading, setResults } = props
  const [searchStr, setSearchStr] = useState('')
  const searchFn = async (str: string): Promise<GithubResultSearch | null> => {
    setIsLoading(true)
    const result = await ghUserSearch(str)

    if (result) {
      updateCacheSearch(str)
      updateCacheResults(result.items)
      setResults(result)
    }

    setIsLoading(false)

    return result
  }

  return (
    <section className="row d-flex justify-content-center">
      <section className="col-12 col-sm-8 col-md-6 col-xl-5 col-xxl-4">
        <div className="row">
          <section className="col-10 ps-4 pe-0">
            <TypeaheadLib
              id="typehead-search-user"
              isLoading={isLoading}
              minLength={2}
              placeholder="Search for a Github user, e.g. Johann-S"
              options={sigCacheResults.value}
              labelKey="login"
              onKeyDown={(ev: KeyboardEvent<HTMLInputElement>) => {
                if (ev.key === 'Enter') {
                  void searchFn(searchStr)
                }
              }}
              onInputChange={(text: string) => { setSearchStr(text) }}
              renderMenuItemChildren={(option: any) => (
                <div key={option.id}>
                  <img
                    alt={option.login}
                    src={option.avatar_url}
                    style={{
                      height: '24px',
                      marginRight: '10px',
                      width: '24px'
                    }}
                  />
                  <span>{option.login}</span>
                </div>
              )}
            />
          </section>
          <section className="col ps-1">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => { void searchFn(searchStr) }}
              disabled={isLoading}
            >
              <FcSearch />
            </button>
          </section>
        </div>
      </section>
    </section>
  )
}
