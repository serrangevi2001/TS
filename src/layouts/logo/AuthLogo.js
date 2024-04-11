import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/logos/Visionware-Logo-R.png';

const AuthLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);

  const appName = "Time Sheet";

  return (
    <div className="p-4 d-flex justify-content-center gap-2">
      {isDarkMode !== false ? (
        <>
          <img className="img-fluid sidebar-logo" src={logo} alt={{appName}}/>
        </>
      ) : (
        <>
          <img className="img-fluid sidebar-logo" src={logo} alt={{appName}} />
        </>
      )}
    </div>
  );
};

export default AuthLogo;
