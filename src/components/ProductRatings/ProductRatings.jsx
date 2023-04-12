import { useState, useCallback } from 'react';
import { client } from '../../lib/client';
import { AiFillStar } from 'react-icons/ai';

const calculateAverageRating = ratings => {
  if (!ratings.length) return 0;
  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  const result = (total / ratings.length).toFixed(2);
  return result;
};

const ProductRatings = ({ product }) => {
  const initialAverageRatings = calculateAverageRating(product.ratings);
  const [averageRating, setAverageRating] = useState(initialAverageRatings);

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
