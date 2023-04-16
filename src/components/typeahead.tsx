import React, { type KeyboardEvent, useState } from 'react'
import { Typeahead as TypeaheadLib } from 'react-bootstrap-typeahead'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FcSearch } from 'react-icons/fc'

/** Root */
import { sigCacheResults } from '@root/signals/cache-results.signal'

interface Props {
  isLoading: boolean
  search: (searchStr: string, page: number) => void
}

export const Typeahead = (props: Props): JSX.Element => {
  const { isLoading, search } = props
  const [searchStr, setSearchStr] = useState('')

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
                  search(searchStr, 1)
                }
              }}
              onInputChange={(text: string) => { setSearchStr(text) }}
              renderMenuItemChildren={(option: any) => (
                <div key={option.id}>
                  <LazyLoadImage
                    alt={option.login}
                    src={`${option.avatar_url as string}&s=24`}
                    className="me-2"
                    threshold={0}
                    effect="blur"
                  />
                  <span className="align-middle">{option.login}</span>
                </div>
              )}
            />
          </section>
          <section className="col ps-1">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => { search(searchStr, 1) }}
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
