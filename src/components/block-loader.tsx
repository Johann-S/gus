import React from 'react'

interface Props {
  text?: string | undefined
}

export const BlockLoader = ({ text = undefined }: Props): JSX.Element => {
  return (
    <div className="d-flex justify-content-center m-3">
      <div className="spinner-border text-primary" role="status" />
      <span className="visually-hidden">Loading...</span>
      {
        text
          ? (<span className="ms-2 align-self-center">{text}</span>)
          : null
      }
    </div>
  )
}
