import { useState, useCallback, useEffect } from 'react';
import { client } from '../../lib/client';
import { AiFillStar } from 'react-icons/ai';
import { calculateAverageRating } from '../../lib/utils';

const ProductRatings = ({ product }) => {
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

  const handleRatingChange = async newRating => {
    try {
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
    <div>
      {[1, 2, 3, 4, 5].map(value => (
        <button
          key={value}
          onClick={() => handleRatingChange(value)}
        >
          <AiFillStar />
        </button>
      ))}
      <p>{averageRating}</p>
    </div>
  );
};

export default ProductRatings;
