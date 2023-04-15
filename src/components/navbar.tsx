import React from 'react'
import { FaGithub } from 'react-icons/fa'

export const Navbar = (): JSX.Element => (
  <header className="container-fluid py-3 mb-4 border-bottom">
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 text-dark text-decoration-none"
        >
          <FaGithub className="me-2" size={40} />
          <span className="fs-4">Github user search</span>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <small className="text-muted">by Johann-S</small>
      </div>
    </div>
  </header>
)
