import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styles from './HeroBanner.module.css';

const HeroBanner = ({ heroBanner, slideIndex }) => {
  const styleContainer = slideIndex => {
    if (slideIndex === 0) {
      return `${styles['hero-banner-container']} ${styles['hero-banner-container-bg-blue']}`
    }
    if (slideIndex === 1) {
      return `${styles['hero-banner-container']} ${styles['hero-banner-container-bg-orange']}`
    }
    if (slideIndex === 2) {
      return `${styles['hero-banner-container']} ${styles['hero-banner-container-bg-blue2']}`
    }
    if (slideIndex === 3) {
      return `${styles['hero-banner-container']} ${styles['hero-banner-container-bg-orange2']}`
    }
  };
  
  return (
    <div className={`${styleContainer(slideIndex)}`}>
      <div>
        <p className={styles.smallText}>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image).url()}
          alt='product'
          className={styles['hero-banner-image']}
        />

        <div>
          <Link href={`/product/${heroBanner.slug.current}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className={styles.desc}>
            <h4>{heroBanner.name}</h4>
            <h5 className={styles.oldPrice}>$ {heroBanner.oldPrice}</h5>
            <div className={styles['price-discount-block']}>
              <h5 className={styles.discount}>🔥{heroBanner.discount}</h5>
              <h5 className={styles.price}>$ {heroBanner.price}</h5>
            </div>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
