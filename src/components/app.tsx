import React, { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

/** Components */
import { BlockLoader } from '@root/components/block-loader'

/** Root */
import { ghRateLimit } from '@root/gh-helper'

const Home = lazy(async () => import('@root/pages/home'))
const Profile = lazy(async () => import('@root/pages/profile'))

export const App = (): JSX.Element => {
  useEffect(
    () => { void ghRateLimit() },
    []
  )

  return (
    <Suspense
      fallback={
        <div className="col-sm-12 mt-5">
          <BlockLoader />
        </div>
      }
    >
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="profile/:login" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
