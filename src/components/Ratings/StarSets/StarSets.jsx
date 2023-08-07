import { BsStarFill, BsStarHalf, BsStar  } from 'react-icons/bs';
import styles from './StarSets.module.css';

// MADNESS - REMAKE COMP, APPLY DRY!!!!!

const StarSets = ({ averageRating, ratingsAmount }) => {
  return (
    <>
      {/* 5 star */}
      {averageRating >= 4.75 && 
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
        </div>
      }

      {/* 4.5 star */}
      {(averageRating >= 4.25 && averageRating < 4.75) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarHalf size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
        </div>  
      }

      {/* 4 star */}
      {(averageRating >= 3.75 && averageRating < 4.25) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
        </div>
      }

      {/* 3.5 star */}
      {(averageRating >= 3.25 && averageRating < 3.75) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarHalf size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
        </div>  
      }

      {/* 3 star */}
      {(averageRating >= 2.75 && averageRating < 3.25) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
        </div>
      }

      {/* 2.5 star */}
      {(averageRating >= 2.25 && averageRating < 2.75) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStarHalf size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
        </div>
      }

      {/* 2 star */}
      {(averageRating >= 1.75 && averageRating < 2.25) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarFill size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
      </div>
      }

      {/* 1.5 star */}
      {(averageRating >= 1.25 && averageRating < 1.75) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStarHalf size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
      </div>
      }

      {/* 1 star */}
      {(averageRating >= 0.75 && averageRating < 1.25) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarFill size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
      </div>
      }

      {/* 0.5 star */}
      {(averageRating >= 0 && averageRating < 0.75) &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStarHalf size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          <p className={styles['average-rating']}>({ratingsAmount})</p>
        </div>
      }

      {/* No rating */}
      {(ratingsAmount === 0 || averageRating === 'Not rated') &&
        <div className={styles['ratings-container']}>
          <div className={styles['stars-container']}>
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
            <BsStar size={20} />
          </div>
          <p className={styles['average-rating']}>{averageRating}</p>
          {/* <p className={styles['average-rating']}>({ratingsAmount})</p> */}
        </div>
      }
    </>
  );
}

export default StarSets;
