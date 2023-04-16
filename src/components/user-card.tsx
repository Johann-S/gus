import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaGithub, FaLink } from 'react-icons/fa'
import { MdOutlineLocationOn } from 'react-icons/md'

/** Models */
import { type GithubUser } from '@models/github-user.model'
import { type GithubUserProfile } from '@models/github-user-profile.model'

/** Root */
import { ghUserProfile } from '@root/gh-helper'
import { BlockLoader } from './block-loader'

interface Props {
  user: GithubUser
}

const longEnoughLink = 29
const cutTooLongLink = (link: string): string => {
  if (link.length > longEnoughLink) {
    return `${link.substring(0, longEnoughLink)}...`
  }

  return link
}

const renderUserData = (login: string, userData: GithubUserProfile | null): JSX.Element => {
  if (!userData) {
    return (
      <p className="alert alert-warning mb-0 text-center" role="alert">
        {`Unable to retrieve ${login}'s profile`}
      </p>
    )
  }

  return (
    <>
      <h5>{userData.name}</h5>
      {userData.bio ? <h6>{userData.bio}</h6> : null}
      {
        userData.location
          ? (
            <p className="mb-0">
              <MdOutlineLocationOn />
              <span className="align-middle ms-1">{userData.location}</span>
            </p>
            )
          : null
      }
      {
        userData.blog
          ? (
              <p className="mb-0">
                <FaLink />
                <a
                  className="text-decoration-none align-middle fs-6 ms-1"
                  href={userData.blog}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cutTooLongLink(userData.blog)}
                </a>
              </p>
            )
          : null
      }
      <ul className="list-group list-group-horizontal text-center mt-3">
        <li className="list-group-item w-50">
          <h5>{userData.followers}</h5>
          <span className="text-muted">Followers</span>
        </li>
        <li className="list-group-item w-50">
          <h5>{userData.following}</h5>
          <span className="text-muted">Following</span>
        </li>
      </ul>
      <ul className="list-group list-group-horizontal text-center">
        <li className="list-group-item w-50">
          <h5>{userData.public_repos}</h5>
          <span className="text-muted">Repos</span>
        </li>
        <li className="list-group-item w-50">
          <h5>{userData.public_gists}</h5>
          <span className="text-muted">Gists</span>
        </li>
      </ul>
    </>
  )
}

export const UserCard = ({ user }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<GithubUserProfile | null>(null)

  useEffect(
    () => {
      void ghUserProfile(user.login)
        .then((profile: GithubUserProfile | null) => {
          setUserData(profile)
          setIsLoading(false)
        })
    },
    []
  )

  return (
    <div key={user.id} className="col-6 col-sm-3 mb-2">
      <div className="card container-fluid h-100">
        <div className="card-header row">
          <div className="col-10">
            <span className="align-middle fw-bold">@{user.login}</span>
          </div>
          <div className="col-2 d-flex flex-row-reverse">
            <a
              href={user.html_url}
              className="text-decoration-none"
              target="_blank"
              rel="noreferrer"
              title={`Open ${user.login} Github profile`}
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="card-body d-flex align-items-center">
          <div className="col-4 flex-shrink-0">
            <LazyLoadImage
              alt={user.login}
              src={user.avatar_url}
              className="me-2 img-fluid img-thumbnail"
              threshold={0}
              effect="blur"
            />
          </div>
          <div className="col-8 flex-grow-1 ms-3">
            {
              isLoading
                ? <BlockLoader />
                : renderUserData(user.login, userData)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
