import React from 'react'
import ReactPaginate from 'react-paginate'
import {
  FaRegSadCry,
  FaForward,
  FaBackward
} from 'react-icons/fa'
import { MdWarningAmber } from 'react-icons/md'

/** Models */
import { type GithubUser } from '@models/github-user.model'
import { type UserPagination } from '@models/user-pagination.model'
import { FilterResults } from '@models/filter-results.enum'

/** Root */
import { sigCacheSearch } from '@root/signals/cache-search.signal'
import { BlockLoader } from '@root/components/block-loader'
import { UserCard } from '@root/components/user-card'
import { ghMaxResults } from '@root/const'

interface Props {
  isLoading: boolean
  results: UserPagination
  totalDisplay: number
  filterResults: string
  setTotalDisplay: (total: number) => void
  setFilterResults: (filter: string) => void
  search: (searchStr: string, page: number) => void
}

export const SearchResults = (props: Props): JSX.Element | null => {
  const {
    results,
    isLoading,
    totalDisplay,
    filterResults,
    setTotalDisplay,
    setFilterResults,
    search
  } = props

  if (!sigCacheSearch.value.length) {
    return null
  }

  if (isLoading) {
    return (
      <section className="mt-5">
        <hr />
        <BlockLoader />
      </section>
    )
  }

  if (!results.totalItems) {
    return (
      <section className="mt-5">
        <hr />
        <h4 className="mb-4">
          <div className="text-center">
            <span className="align-middle me-2">Found nothing</span>
            <FaRegSadCry className="text-warning" />
          </div>
        </h4>
      </section>
    )
  }

  return (
    <section className="mt-5">
      <hr />
      <div className="row mb-4">
        <div className="col-12 col-sm-9 col-md-8">
          <h4>
            <div>
              <span className="me-1">Found</span>
              <span className="text-success me-1">{results.totalItems}</span>
              <span className="me-1">results for</span>
              <span className="text-primary fw-bold">&quot;{results.search}&quot;</span>
            </div>
          </h4>
        </div>
        <div className="col-12 col-sm-3 col-md-4 d-flex flex-row-reverse">
          <select
            className="form-select form-select-sm small-select-width"
            onChange={(ev) => { setTotalDisplay(Number(ev.target.value)) }}
            value={totalDisplay}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <select
            className="form-select form-select-sm me-2"
            onChange={(ev) => { setFilterResults(ev.target.value) }}
            value={filterResults}
          >
            <option value={FilterResults.BestMatch}>Best match</option>
            <option value={FilterResults.Followers}>Followers</option>
            <option value={FilterResults.Repositories}>Repositories</option>
            <option value={FilterResults.Joined}>Joined</option>
          </select>
        </div>
      </div>
      {
        results.totalItems > ghMaxResults
          ? (
              <div className="row d-flex justify-content-center mb-3">
                <div className="col-6">
                  <p className="alert alert-warning text-center">
                    <MdWarningAmber size={24} />
                    <span className="ms-2 align-middle">
                      <span>GitHub REST API provides up to </span>
                      <strong>1,000 results for each search. </strong>
                      <span>Please specify your search criteria to obtain fewer results.</span>
                    </span>
                  </p>
                </div>
              </div>
            )
          : null
      }
      <div className="row">
        {
          results.items.length
            ? results.items.map((githubUser: GithubUser) => (
              <UserCard key={githubUser.id} user={githubUser} />
            ))
            : null
        }
      </div>
      <div className="row">
        <nav className="col-12 mt-2 d-flex justify-content-center" aria-label="Github user pagination">
          <ReactPaginate
            forcePage={results.totalPages > 0 ? results.currentPage - 1 : -1}
            pageCount={results.totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={(ev) => { search(results.search, ev.selected + 1) }}
            nextLabel={(<FaForward />)}
            previousLabel={(<FaBackward />)}
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </nav>
      </div>
    </section>
  )
}
