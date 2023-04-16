import React from 'react'

/** Components */
import { Navbar } from './navbar'
import { Search } from './search'

const Home = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Search />
    </>
  )
}

export default Home
