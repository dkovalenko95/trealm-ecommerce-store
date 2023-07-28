import { useState, useEffect } from 'react';
import { calculateAverageRating } from '../../../lib/utils';
import styles from './RatingStars.module.css';
import SetProductRating from '../SetRating/SetRating';
import StarSets from '../StarSets/StarSets';

// TODO: IMPROVE/REMAKE COMP -> 
// - apply DRY, find way to render diff icons efficiently, 
// - improve State management, context/redux/recoil

const RatingStars = ({ product }) => {
  const [showRatePick, setShowRatePick] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [ratingsAmount, setRatingsAmount] = useState(null);

  useEffect(() => {
    if (!product.ratings || product.ratings.length === 0) {
      setAverageRating('Not rated');
      setRatingsAmount(0);
    } else {
      const newAverageRating = calculateAverageRating(product.ratings);
      setAverageRating(newAverageRating);
      setRatingsAmount(product.ratings.length);
    } 
  }, [product]);

  return (
    <div className={styles.container}>

      <StarSets product={product} averageRating={averageRating} ratingsAmount={ratingsAmount} />

      <div className={styles['set-rating-container']}>

        {(!showRatePick && !userRating) &&
          <button
            className={styles.rateBtn}
            type='button'
            onClick={() => setShowRatePick(true)}
          >
            Rate
          </button>
        }

        {showRatePick &&
          <SetProductRating
            product={product} 
            setAverageRating={setAverageRating}
            setShowRatePick={setShowRatePick}
            setUserRating={setUserRating}
            setRatingsAmount={setRatingsAmount}
            ratingsAmount={ratingsAmount}
          />
        }

        {userRating !== null && <p className={styles['user-rating']}>You rated <span>{`${userRating}`}</span></p>}
      </div>

    </div>
    
  );
};

export default RatingStars;
