import React from 'react'

/** Components */
import { Navbar } from '@root/components/navbar'
import { Search } from '@root/components/search'
import { Footer } from '@root/components/footer'

const Home = (): JSX.Element => (
  <>
    <Navbar />
    <Search />
    <Footer />
  </>
)

export default Home
