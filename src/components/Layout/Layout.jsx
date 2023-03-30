import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>TRealm | Tech Store</title>
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon.png'></link>
      </Head>

      <Navbar />

      <div className={styles.layout}>

        <main className={styles['main-container']}>
          {/* children - <Component/> in _app.js */}
          {children}
        </main>

        <footer>
          <Footer />
        </footer>

      </div>
    </>
  );
};

export default Layout;
