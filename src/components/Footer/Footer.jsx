import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <p>2023 TRealm. All rights reserved</p>
      <p className={styles.icons}>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
