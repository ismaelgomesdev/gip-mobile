import React from 'react';
import logo from '/src/assets/logos/city.png';
import styles from './city-logo.module.scss';

const CityLogo = () => {
  return (
    <div className={styles['city-logo-container']}>
      <img src={logo} alt="City Logo" className={styles['city-logo']} />
    </div>
  );
};

export default CityLogo;
