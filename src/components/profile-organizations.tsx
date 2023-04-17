import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { RiOrganizationChart } from 'react-icons/ri'

/** Models */
import { type RawOrganization } from '@models/result-raw-user-profile.model'

interface Props {
  organizations: RawOrganization[]
}

export const ProfileOrganizations = ({ organizations }: Props): JSX.Element => (
  <section className="row mt-4">
    <div className="col-12">
      <h3>
        <RiOrganizationChart />
        <span className="ms-2 align-middle">Organizations</span>
      </h3>
    </div>
    <div className="col-12 mt-3">
      <div className="row">
        {
          organizations.map((mOrganization: RawOrganization) => (
            <div key={mOrganization.databaseId} className="col-2">
              <a
                className="text-decoration-none"
                href={mOrganization.url}
                target="_blank"
                rel="noreferrer"
              >
                <LazyLoadImage
                  alt={mOrganization.name}
                  src={`${mOrganization.avatarUrl}&s=64`}
                  className="me-2 img-fluid rounded"
                  threshold={0}
                  effect="blur"
                  height={64}
                  width={64}
                />
                <span className="ms-2 align-middle text-muted">{mOrganization.name}</span>
              </a>
            </div>
          ))
        }
      </div>
    </div>
  </section>
)
