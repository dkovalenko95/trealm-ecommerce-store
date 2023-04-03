import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styles from './FooterBanner.module.css';

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, buttonText, image, desc, slug } }) => {
  return (
    <div className={styles['footer-banner-container']}>
      <div className={styles['banner-desc']}>
        <div className={styles['left']}>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className={styles['right']}>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${slug.current}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img 
          src={urlFor(image).url()}
          className={styles['footer-banner-image']}
          alt='footer banner image'
        />
      </div>
    </div>
  );
};

export default FooterBanner;
