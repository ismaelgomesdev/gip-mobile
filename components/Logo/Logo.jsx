import React from 'react';
import PropTypes from 'prop-types';
import styles from './logo.module.css';

const Logo = ({ width, height }) => {
    return (
        <div className={styles.logoContainer} style={{ width, height }}>
            Logo
        </div>
    );
};

export default Logo;