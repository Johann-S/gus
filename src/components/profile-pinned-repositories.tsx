import React from 'react'
import { RiGitRepositoryLine, RiStarFill } from 'react-icons/ri'
import { GoRepoForked } from 'react-icons/go'

/** Models */
import { type RawLanguage, type RawPinnedRepository } from '@models/result-raw-user-profile.model'

interface Props {
  repositories: RawPinnedRepository[]
}

const renderLanguages = (languages: RawLanguage[]): JSX.Element[] => {
  return languages.map((lang: RawLanguage, index: number) => (
    <>
      <span
        key={lang.id}
        className="align-middle"
        style={{ color: lang.color }}
      >
        {lang.name}
      </span>
      {
        index !== languages.length - 1
          ? (<span className="align-middle ms-1 me-1">/</span>)
          : null
      }
    </>
  ))
}

export const ProfilePinnedRepositories = ({ repositories }: Props): JSX.Element => (
  <section className="row mt-4">
    <div className="col-12">
      <h3>
        <RiGitRepositoryLine />
        <span className="ms-2 align-middle">Pinned repositories</span>
      </h3>
    </div>
    <div className="col-12 mt-3">
      <div className="row">
        {
          repositories.map((mPinnedRepository: RawPinnedRepository) => (
            <div key={mPinnedRepository.databaseId} className="col-12 mb-3">
              <section>
                <a
                  className="text-decoration-none"
                  href={mPinnedRepository.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>{mPinnedRepository.name}</h4>
                </a>
              </section>
              <p>{mPinnedRepository.description}</p>
              <section>
                {renderLanguages(mPinnedRepository.languages.nodes)}
                <RiStarFill className="ms-4" />
                <span className="ms-1 me-4 align-middle">{mPinnedRepository.stargazerCount}</span>
                <GoRepoForked />
                <span className="ms-1 me-4 align-middle">{mPinnedRepository.forkCount}</span>
              </section>
            </div>
          ))
        }
      </div>
    </div>
  </section>
)
