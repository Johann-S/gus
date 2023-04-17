import React, { useEffect } from 'react'

/** Root */
import { ghRateLimit } from '@root/gh-helper'

/** Components */
import { Navbar } from '@root/components/navbar'
import { Search } from '@root/components/search'
import { Footer } from '@root/components/footer'

const Home = (): JSX.Element => {
  useEffect(
    () => { void ghRateLimit() },
    []
  )

  return (
    <>
      <Navbar />
      <Search />
      <Footer />
    </>
  )
}

export default Home
