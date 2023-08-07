import { useState, useCallback } from 'react';
import { client } from '../../../lib/client';
import { BsStarFill } from 'react-icons/bs';
import { calculateAverageRating } from '../../../lib/utils';
import styles from './SetRating.module.css';

// NOTE: In more advanced app version, need to base rating func on userID/session somehow so that a user can't do the rate more than once

const SetRating = ({ product, setAverageRating, setShowRatePick, setUserRating, setRatingsAmount, ratingsAmount }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleRatingChange = async newRating => {
    try {
      const updatedItem = await updateRating(newRating);
      const updatedAverageRating = calculateAverageRating(updatedItem.ratings);
      setRatingsAmount(ratingsAmount + 1);
      setAverageRating(updatedAverageRating);
      setShowRatePick(false);
      setUserRating(newRating);
    } catch (error) {
      console.error(error);
      // TODO: Display error with UI
    }
  };

  const updateRating = useCallback(async newRating => {
    const { _id } = product;
    const newItem = await client
      .patch(_id)
      .setIfMissing({ ratings: [] })
      .insert('after', 'ratings[-1]', [ newRating ])
      .commit({
        autoGenerateArrayKeys: true,
      })
      return newItem;
  }, [product]);

  return (
    <div className={styles['ratings-container']}>
      <div className={styles['stars-container']}>
        {[1, 2, 3, 4, 5].map((value, index) => {
          const ratingValue = index + 1;

          const hoverCondition = ratingValue => {
            if (rating === null || ratingValue > rating) {
              return ratingValue <= hover ? '#ff5a1e' : '#e4e5e9';
            };
            if (rating > 0) {
              return ratingValue <= rating ? '#ff5a1e' : '#e4e5e9'
            };
          };
         
          return (
            <div key={index}>
              <input
                className={styles.radio}
                type='radio'
                name='rating'
              />
              <BsStarFill
                size={24}
                className={styles.star}
                color={hoverCondition(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  handleRatingChange(value);
                  setRating(value);
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SetRating;

