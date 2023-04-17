import React, { useState, useEffect } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaLink, FaArrowLeft } from 'react-icons/fa'
import { MdOutlineLocationOn, MdWork } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'

/** Models */
import { type RawUserProfile } from '@models/result-raw-user-profile.model'

/** Components */
import { Footer } from '@root/components/footer'
import { BlockLoader } from '@root/components/block-loader'
import { ProfileOrganizations } from '@root/components/profile-organizations'

/** Root */
import { ghUserProfile } from '@root/gh-helper'

/** Styles */
import '@root/css/profile.css'
import { ProfilePinnedRepositories } from '@root/components/profile-pinned-repositories'

const Profile = (): JSX.Element => {
  const { login } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [ghUser, setGhUser] = useState<RawUserProfile | undefined>(undefined)

  useEffect(
    () => {
      if (!login) {
        setShouldRedirect(true)

        return
      }

      void ghUserProfile(login)
        .then(data => {
          if (!data) {
            setShouldRedirect(true)

            return
          }

          setGhUser(data)
          setLoading(false)
        })
    },
    []
  )

  if (shouldRedirect) {
    return <Navigate to="/" />
  }

  if (loading) {
    return <BlockLoader />
  }

  return (
    <>
      <Helmet title={ghUser ? `${ghUser.login} profile - GUS` : undefined} />
      <div className="container mt-3">
        <section className="row mb-3">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={() => { navigate('/') }}
            >
              <FaArrowLeft />
              <span className="align-middle ms-2">Back</span>
            </button>
          </div>
        </section>
        <section className="row">
          <div className="col-3">
            <LazyLoadImage
              alt={ghUser?.login}
              src={ghUser?.avatarUrl}
              className="me-2 img-fluid rounded"
              threshold={0}
              effect="blur"
            />
          </div>
          <div className="col-9 d-flex align-items-start flex-column">
            <section>
              <h3 className="mb-0">{ghUser?.name}</h3>
              <a
                href={ghUser?.url}
                className="text-decoration-none"
                target="_blank"
                rel="noreferrer"
                title="Open Github profile"
              >
                @{ghUser?.login}
              </a>
            </section>
            <section dangerouslySetInnerHTML={{ __html: ghUser?.bioHTML as string }}></section>
            <section>
              {
                ghUser?.company
                  ? (
                    <p className="mb-0">
                      <MdWork />
                      <span className="align-middle ms-1">{ghUser.company}</span>
                    </p>
                    )
                  : null
              }
              {
                ghUser?.location
                  ? (
                    <p className="mb-0">
                      <MdOutlineLocationOn />
                      <span className="align-middle ms-1">{ghUser.location}</span>
                    </p>
                    )
                  : null
              }
              {
                ghUser?.websiteUrl
                  ? (
                      <p className="mb-0">
                        <FaLink />
                        <a
                          className="text-decoration-none align-middle fs-6 ms-1"
                          href={ghUser.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {ghUser.websiteUrl}
                        </a>
                      </p>
                    )
                  : null
              }
            </section>
            <div className="mt-auto">
              <ul className="list-group list-group-horizontal text-center">
                <li className="list-group-item w-50">
                  <h5>{ghUser?.followers.totalCount}</h5>
                  <span className="text-muted">Followers</span>
                </li>
                <li className="list-group-item w-50">
                  <h5>{ghUser?.following.totalCount}</h5>
                  <span className="text-muted">Following</span>
                </li>
                <li className="list-group-item w-50">
                  <h5>{ghUser?.repositories.totalCount}</h5>
                  <span className="text-muted">Repositories</span>
                </li>
                <li className="list-group-item w-50">
                  <h5>{ghUser?.gists.totalCount}</h5>
                  <span className="text-muted">Gists</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {
          ghUser?.organizations.nodes.length
            ? (<ProfileOrganizations organizations={ghUser.organizations.nodes} />)
            : null
        }
        {
          ghUser?.pinnedItems.nodes.length
            ? (<ProfilePinnedRepositories repositories={ghUser.pinnedItems.nodes} />)
            : null
        }
      </div>
      <Footer />
    </>
  )
}

export default Profile
