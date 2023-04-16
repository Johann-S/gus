import React, { type KeyboardEvent, useState } from 'react'
import { Typeahead as TypeaheadLib } from 'react-bootstrap-typeahead'
import { FcSearch } from 'react-icons/fc'
import { FaHistory } from 'react-icons/fa'

/** Root */
import { sigCacheSearch } from '@root/signals/cache-search.signal'

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
              options={sigCacheSearch.value}
              labelKey="login"
              onKeyDown={(ev: KeyboardEvent<HTMLInputElement>) => {
                if (ev.key === 'Enter') {
                  search(searchStr, 1)
                }
              }}
              onInputChange={(text: string) => { setSearchStr(text) }}
              renderMenuItemChildren={(option: any) => (
                <div
                  key={`key-${option as string}`}
                  onClick={() => { setSearchStr(option) }}
                  className="text-muted"
                >
                  <FaHistory />
                  <span className="align-middle ms-2">{option}</span>
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
