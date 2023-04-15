import React from 'react'

/** Models */
import { type GithubResultSearch } from '@models/github-result.search.model'
import { type GithubUser } from '@models/github-user.model'

interface Props {
  results: GithubResultSearch
}

export const SearchResults = (props: Props): JSX.Element | null => {
  const { results } = props

  return (
    <section className="mt-5">
      <hr />
      <div className="row">
        {
          results.items.length
            ? results.items.map((githubUser: GithubUser) => (
              <div key={githubUser.id} className="col-3">
                <div className="card">
                  <div className="card-header">
                    <a
                      href={githubUser.html_url}
                      className="text-decoration-none"
                    >
                      {githubUser.login}
                    </a>
                  </div>
                </div>
              </div>
            ))
            : null
        }
      </div>
    </section>
  )
}
