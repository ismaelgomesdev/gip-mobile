import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordToggleButton = ({ isPasswordVisible, onToggle }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="absolute inset-y-0 right-2 flex items-center bg-transparent p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
            {isPasswordVisible ? (
                <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
                <FontAwesomeIcon icon={faEye} />
            )}
        </button>
    );
};

PasswordToggleButton.propTypes = {
    isPasswordVisible: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default PasswordToggleButton;
