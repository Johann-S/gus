import React, { Suspense, lazy } from 'react'
import { BlockLoader } from './block-loader'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(async () => import('@root/components/home'))

export const App = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <div className="col-sm-12 mt-5">
          <BlockLoader />
        </div>
      }
    >
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </Suspense>
  )
}
