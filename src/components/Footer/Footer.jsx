import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles['footer-container']}>
      <p>2023 TRealm. All rights reserved</p>
      <p className={styles.icons}>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
