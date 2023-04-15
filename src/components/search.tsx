import React, { type KeyboardEvent, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { FcSearch } from 'react-icons/fc'

/** Root */
import { ghUserSearch } from '@root/gh-helper'

const searchFn = async (str: string): Promise<void> => {
  const result = await ghUserSearch(str)

  console.log(result)
}

export const Search = (): JSX.Element => {
  const [isLoading] = useState(false)
  const [cache] = useState([])
  const [searchStr, setSearchStr] = useState('')

  return (
    <div className="container-fluid">
      <section className="row d-flex justify-content-center">
        <section className="col-12 col-sm-8 col-md-6 col-xl-5 col-xxl-4">
          <div className="row">
            <section className="col-10 ps-4 pe-0">
              <Typeahead
                id="typehead-search-user"
                isLoading={isLoading}
                minLength={2}
                placeholder="Search for a Github user, e.g. Johann-S"
                options={cache}
                onKeyDown={(ev: KeyboardEvent<HTMLInputElement>) => {
                  if (ev.key === 'Enter') {
                    void searchFn(searchStr)
                  }
                }}
                onInputChange={(text: string) => { setSearchStr(text) }}
              />
            </section>
            <section className="col ps-1">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => { void searchFn(searchStr) }}
              >
                <FcSearch />
              </button>
            </section>
          </div>
        </section>
      </section>
    </div>
  )
}
