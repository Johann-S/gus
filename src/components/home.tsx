import React from 'react'

/** Components */
import { Navbar } from './navbar'
import { Search } from './search'

export const Home = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Search />
    </>
  )
}
