import React from 'react';
import '../styles/globals.css';

import { Layout } from '../components';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      {/* Current comp/page: */}
      <Component {...pageProps} />
    </Layout>
  );
};
