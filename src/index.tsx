import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root') as Element);

root.render(
  (
    <HelmetProvider>
      <h1>GUS - Github user search by Johann-S</h1>
    </HelmetProvider>
  ),
);
