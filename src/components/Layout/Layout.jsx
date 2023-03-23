import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>SNDRealm</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className={styles['main-container']}>
        {/* children - <Component/> in _app.js */}
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
