import { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import HeroBanner from './HeroBanner';
import styles from './SliderHeroBanner.module.css';

const SliderHeroBanner = ({ slides }) => {
  const [currSlideIndex, setcurrSlideIndex] = useState(0);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  };

  const goToPrevHandler = () => {
    const isFirstSlide = currSlideIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currSlideIndex - 1;
    setcurrSlideIndex(newIndex);
  };
  const goToNextHandler = () => {
    const isLastSlide = currSlideIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currSlideIndex + 1;
    setcurrSlideIndex(newIndex);
  };
  const dotHandler = index => {
    setcurrSlideIndex(index);
  };

  return (
    <div className={styles.sliderContainer}>
      {/* Arrows */}
      <div className={styles.arrowPrev} onClick={goToPrevHandler}>
        <SlArrowLeft />
      </div>
      <div className={styles.arrowNext} onClick={goToNextHandler}>
        <SlArrowRight />
      </div>
      
      {/* Banners */}
      {slides.map((slide, index) => {
        return (
          <div key={index}>
            {index === currSlideIndex && (
              <HeroBanner heroBanner={slide} slideIndex={index} className={styles.slide} />
            )}
          </div>
        )
      })}

      {/* Dots */}
      <div className={styles['container-dots']}>
        {Array.from({ length: slides.length })
          .map((_item, index) => {
            return (
              <div
                key={index}
                className={currSlideIndex === index ? `${styles.dot} ${styles.active}` : `${styles.dot}`}
                onClick={() => dotHandler(index)}
              />
            )
          }
        )}
      </div>
    </div>
  );
};

export default SliderHeroBanner;
