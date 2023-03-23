import React from 'react';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import { StateContext } from '../context/StateContext';

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        {/* Current comp/page: */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
};
