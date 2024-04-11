import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../assets/images/logos/logo.png';

const HorizontalLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activetopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activetopbarBg !== 'white' ? (
        <>
          <img className="img-fluid d-none d-lg-block" src={logo} alt="App Logo" />
        </>
      ) : (
        <>
          <img className="img-fluid d-none d-lg-block" src={logo} alt="App Logo" />
        </>
      )}
    </Link>
  );
};

export default HorizontalLogo;
