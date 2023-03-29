import React from 'react';
import Link from 'next/link';
import { urlFor } from '../../lib/client';
import styles from './HeroBanner.module.css';

const HeroBanner = ({ heroBanner }) => {
  
  return (
    <div className={styles['hero-banner-container']}>
      <div>
        <p className={styles.smallText}>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt='headphones'
          className={styles['hero-banner-image']}
        />

        <div>
          <Link href={`/product/${heroBanner.slug.current}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className={styles.desc}>
            <h4>{heroBanner.name}🔥</h4>
            <h5 className={styles.oldPrice}>$ {heroBanner.oldPrice}</h5>
            <h5 className={styles.price}>$ {heroBanner.price}</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
