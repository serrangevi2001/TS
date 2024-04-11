import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
// import * as Icon from 'react-feather';
import Avatar from 'react-avatar';
import logo from '../../assets/images/logos/visionwareicon.png';
import NotificationDD from './NotificationDD';
import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';
import { logoutUser } from '../../store/auth/login/action';


// eslint-disable-next-line react/prop-types
const Header = ({ logoutUserAction, isAuth ,currentProfile}) => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const dispatch = useDispatch();
  
  console.log("Is Authentication:",isAuth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="topbar"
    >
      <div className="d-flex align-items-center">
        <Button
          color={topbarColor}
          className="d-none d-lg-block"
          onClick={() => dispatch(ToggleMiniSidebar())}
        >
          <i className="bi bi-list" />
        </Button>
        <NavbarBrand href="/" className="d-sm-block d-lg-none">
          <img className="img-fluid sidebar-logosingle" src={logo} alt="App Logo" />
        </NavbarBrand>
        <Button
          color={topbarColor}
          className="d-sm-block d-lg-none"
          onClick={() => dispatch(ToggleMobileSidebar())}
        >
          <i className="bi bi-list" />
        </Button>
      </div>

      <Nav className="me-auto d-none d-lg-flex" navbar>
        <NavItem  style={{color:"white"}}>
          {/* <Link to="/app" className="nav-link"> */}
          Visionware Technologies
          {/* </Link> */}
        </NavItem>
      </Nav>
      <div className="d-flex">
        <UncontrolledDropdown>
          <DropdownMenu className="ddWidth">
            <DropdownItem header>
              <span className="mb-0">Notifications</span>
            </DropdownItem>
            <DropdownItem divider />
            <SimpleBar style={{ maxHeight: '350px' }}>
              <NotificationDD />
            </SimpleBar>
            <DropdownItem divider />
            <div className="p-2 px-3">
              <Button color="primary" size="sm" block>
                Check All
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown>
          <DropdownToggle color={topbarColor}>
            <Avatar name={currentProfile && currentProfile.displayName} round size={30} />
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <ProfileDD />
            <div className="p-2 px-3">
              <Button color="danger" size="sm" onClick={logoutUserAction}>
                Logout
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.login.isAuth,
  currentProfile: state.login.profile,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUserAction: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
