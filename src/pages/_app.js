import React from 'react';
import '../styles/globals.css';

import { Layout } from '../components';
import { StateContext } from '../context/StateContext';

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        {/* Current comp/page: */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
};
