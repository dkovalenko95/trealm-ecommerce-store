import styles from './ProdContainer.module.css';

const ProdContainer = ({ children }) => {
  return (
    <div className={styles['product-detail-container']}>
      { children }
    </div>
  );
}

export default ProdContainer;
