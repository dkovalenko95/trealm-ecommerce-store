import { useState, useCallback, useEffect } from 'react';
import { client } from '../../lib/client';
import { BsStarFill, BsStarHalf, BsStar  } from 'react-icons/bs';
import { calculateAverageRating } from '../../lib/utils';
import styles from './ProductRatings.module.css';

// TODO: Make 
// 1. Dispalying rating 
// 2. Hover and set rating
// in different components

const ProductRatings = ({ product }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);


  const [averageRating, setAverageRating] = useState(() => {
    if (!product.ratings) {
      return 'This product has not yet been rated';
    } else {
      return calculateAverageRating(product.ratings);
    }
  });

  useEffect(() => {
    if (product.ratings) {
      const newAverageRating = calculateAverageRating(product.ratings);
      setAverageRating(newAverageRating);
    } else {
      setAverageRating('This product has not yet been rated');
    }
  }, [product]);

  console.log(product);
  console.log(averageRating);

  const handleRatingChange = async newRating => {
    try {
      console.log(newRating);
      const updatedItem = await updateRating(newRating);
      const updatedAverageRating = calculateAverageRating(updatedItem.ratings);
      setAverageRating(updatedAverageRating);
    } catch (error) {
      console.error(error);
      // Display error with UI
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
    <>
      <div>
        {averageRating > 4.5 && (
          <>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
          </>
        )}
        {averageRating < 4.5 && (
          <>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStar />
          </>
        )}
      </div>


      <div className={styles['ratings-container']}>
        <div className={styles['stars-container']}>
          {[1, 2, 3, 4, 5].map((value, index) => {
            const ratingValue = index + 1;

            const hoverCondition = ratingValue => {
              if (rating === null || ratingValue > rating) {
                return ratingValue <= hover ? '#ffc107' : '#e4e5e9';
              };
              if (rating > 0) {
                return ratingValue <= rating ? '#ffc107' : '#e4e5e9'
              };
            };

            
            return (
              <label key={value}>
                <input
                  className={styles.radio}
                  type='radio'
                  name='rating'
                  onClick={() => handleRatingChange(value)}
                />
                <BsStarFill
                  size={25}
                  className={styles.star}
                  color={hoverCondition(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            )
          })}
        </div>
        <p className={styles['average-rating']}>{averageRating}</p>
      </div>
    </>
  );
};

export default ProductRatings;
