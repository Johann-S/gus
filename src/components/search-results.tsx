import React from 'react'
import ReactPaginate from 'react-paginate'
import {
  FaRegSadCry,
  FaForward,
  FaBackward
} from 'react-icons/fa'

/** Models */
import { type GithubUser } from '@models/github-user.model'
import { type UserPagination } from '@models/user-pagination.model'

/** Root */
import { sigCacheResults } from '@root/signals/cache-results.signal'
import { BlockLoader } from './block-loader'
import { UserCard } from './user-card'

interface Props {
  isLoading: boolean
  results: UserPagination
  search: (searchStr: string, page: number) => void
}

export const SearchResults = (props: Props): JSX.Element | null => {
  const { results, isLoading, search } = props

  if (!sigCacheResults.value.length) {
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

  return (
    <section className="mt-5">
      <hr />
      <h4 className="mb-4">
        {
          results.totalItems
            ? (
                <div>
                  <span className="me-1">Found</span>
                  <span className="text-success me-1">{results.totalItems}</span>
                  <span className="me-1">results for</span>
                  <span className="text-primary fw-bold">{results.search}</span>
                </div>
              )
            : (
                <div className="text-center">
                  <span className="align-middle me-2">Found nothing</span>
                  <FaRegSadCry className="text-warning" />
                </div>
              )
        }
      </h4>
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
        <nav className="col-12 mt-2" aria-label="Github user pagination">
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
            pageLinkClassName="page-link c-pointer"
            previousClassName="page-item"
            previousLinkClassName="page-link c-pointer"
            nextClassName="page-item"
            nextLinkClassName="page-link c-pointer"
            activeClassName="active"
          />
        </nav>
      </div>
    </section>
  )
}
