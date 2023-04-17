import React from 'react'
import { FaGithubSquare } from 'react-icons/fa'
import cx from 'classnames'

/** Root */
import { sigRateLimit } from '@root/signals/rate-limit.signal'

export const Footer = (): JSX.Element => {
  const rateLimit = sigRateLimit.value

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <section className="container-fluid">
        <div className="row">
          <div
            className={cx(
              'col-12',
              'col-sm-6',
              'mb-3',
              'mb-sm-0'
            )}
          >
            <p
              className={cx(
                'mb-0',
                'align-middle',
                'text-center',
                'text-sm-start'
              )}
            >
              <a
                href="https://github.com/Johann-S/gus/tree/main"
                className="text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithubSquare size={24} className="text-body" />
                <span className="align-middle ms-2">View source code on Github</span>
              </a>
            </p>
          </div>
          <div
            className={cx(
              'col-12',
              'col-sm-6',
              'd-flex',
              'justify-content-center',
              'justify-content-sm-end',
              'align-items-center'
            )}
          >
            {
              rateLimit
                ? (
                    <div className="badge bg-secondary">
                      <p className="mb-0">
                        <span>GraphQL</span>
                        <span
                          className={cx(
                            'ms-2',
                            'me-2',
                            'text-info'
                          )}
                        >
                          {rateLimit.resources.graphql.used}/{rateLimit.resources.graphql.limit}
                        </span>
                        <span>Search</span>
                        <span
                          className={cx(
                            'ms-2',
                            'text-info'
                          )}
                        >
                          {rateLimit.resources.search.used}/{rateLimit.resources.search.limit}
                        </span>
                      </p>
                    </div>
                  )
                : null
            }
          </div>
        </div>
      </section>
    </footer>
  )
}
