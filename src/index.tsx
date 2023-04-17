import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './css/util.css'

/** Components */
import { BlockLoader } from '@root/components/block-loader'
import { App } from '@root/components/app'

const root = createRoot(document.getElementById('root') as Element)

root.render(
  (
    <HelmetProvider>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        defaultTitle="GUS - Github User Search"
        bodyAttributes={{ class: 'h-100' }}
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="GUS is a webpage which allows you to search github users" />
      </Helmet>
      <Suspense fallback={<BlockLoader />}>
        <StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>
      </Suspense>
    </HelmetProvider>
  )
)
