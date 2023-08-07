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

      <header>
        <Navbar />
      </header>

      <main className={styles.layout}>
        {/* children - <Component/> in _app.js */}
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
