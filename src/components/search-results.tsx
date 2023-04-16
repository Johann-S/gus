import React from 'react'
import ReactPaginate from 'react-paginate'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
  FaRegSadCry,
  FaForward,
  FaBackward,
  FaGithub
} from 'react-icons/fa'

/** Models */
import { type GithubUser } from '@models/github-user.model'
import { type UserPagination } from '@models/user-pagination.model'

/** Root */
import { sigCacheResults } from '@root/signals/cache-results.signal'

interface Props {
  isLoading: boolean
  results: UserPagination
  search: (searchStr: string, page: number) => void
}

export const SearchResults = (props: Props): JSX.Element | null => {
  const { results, search } = props

  if (!sigCacheResults.value.length) {
    return null
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
                <div>
                  <span>Found nothing</span>
                  <FaRegSadCry />
                </div>
              )
        }
      </h4>
      <div className="row">
        {
          results.items.length
            ? results.items.map((githubUser: GithubUser) => (
              <div key={githubUser.id} className="col-6 col-sm-3 mb-2">
                <div className="card">
                  <div className="card-header row">
                    <div className="col-10">
                      <span className="align-middle fw-bold">{githubUser.login}</span>
                    </div>
                    <div className="col-2 d-flex flex-row-reverse">
                      <a
                        href={githubUser.html_url}
                        className="text-decoration-none"
                        target="_blank"
                        rel="noreferrer"
                        title={`Open ${githubUser.login} Github profile`}
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                  <div className="card-body row">
                    <div className="col-5">
                      <LazyLoadImage
                        alt={githubUser.login}
                        src={`${githubUser.avatar_url}`}
                        className="me-2 img-fluid img-thumbnail"
                        threshold={0}
                        effect="blur"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
