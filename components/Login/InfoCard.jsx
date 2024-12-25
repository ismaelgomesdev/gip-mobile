import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import CityLogo from '../Logo/CityLogo';

const InfoCard = ({ tagline }) => {
  return (
    <div
      className="w-full h-full bg-[#102D40] bg-opacity-80 backdrop-blur-md rounded-l-lg p-4 pr-5 flex flex-col items-center justify-center space-y-6 min-w-52"
      style={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        height: '100%',
        backgroundColor: '#102D40',
        backgroundOpacity: 0.8
      }}
    >
      <Logo width="5vw" height="5vw" />
      <div className="flex items-center w-full">
        <div className="flex-grow border-t border-white w-4"></div>
        <p className="text-center text-white text-sm font-semibold mx-2">{tagline}</p>
        <div className="flex-grow border-t border-white w-4"></div>
      </div>
      <CityLogo/>
    </div>
  );
};

InfoCard.propTypes = {
  tagline: PropTypes.string, // Frase opcional ao centro
};

InfoCard.defaultProps = {
  tagline: 'à serviço de',
};

export default InfoCard;