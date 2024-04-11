import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
// import logoSingle from '../../assets/images/logos/visionwareicon.png'
import logoSingle from '../../assets/images/logos/visionwareicon.png'
import logo from '../../assets/images/logos/Visionware-Logo-R.png';

const Logo = () => {
  const appName = "Total Product Tracker";
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  return (
 
    <>
        <Link to="/" className="img-fluid sidebar-logo">
      {isDarkMode || activeSidebarBg !== 'white' ? (
        <>
          {toggleMiniSidebar ? (
            <img className="img-fluid sidebar-logosingle" src={logoSingle}  alt={{appName}} />
          ) : (
            <img className="img-fluid sidebar-logo" src={logo}  alt={{appName}} />
          )}
        </>
      ) : (
        <>
          {toggleMiniSidebar ? (
            <img className="img-fluid sidebar-logosingle" src={logoSingle} alt={{appName}} />
          ) : (
            <img className="img-fluid sidebar-logo" src={logo} alt={{appName}} />
          )}
        </>
      )}
    </Link>
    </>
  );
};

export default Logo;
