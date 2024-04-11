import React from 'react';
import { Button, Nav } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import SidebarData from '../sidebardata/SidebarData';
// import SidebarDataUser from '../sidebardata/SidebarDataUser';
import SidebarDataDeveloperClient from '../sidebardata/SidebarDataDeveloperClient';
import Logo from '../../logo/Logo';
import { ToggleMobileSidebar } from '../../../store/customizer/CustomizerSlice';
import NavItemContainer from './NavItemContainer';
import NavSubMenu from './NavSubMenu';




const mapStateToProps=(state)=>({
  currentRole: state.login.profile.currentUserRoles,
})

const Sidebar = (props) => {
  const location = useLocation();
  const currentURL = location.pathname.split('/').slice(0, -1).join('/');

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };

  const activeBg = useSelector((state) => state.customizer.sidebarBg);
  const isFixed = useSelector((state) => state.customizer.isSidebarFixed);
  const dispatch = useDispatch();
  //eslint-disable-next-line
  console.log("currentRole:",props.currentRole)
  //eslint-disable-next-line
  // const sidebarDataMap=props.currentRole==="Administrators"?SidebarData:SidebarDataDeveloperClient;



  let sidebarDataMap;
//eslint-disable-next-line
  if(props.currentRole==="Administrators"){
    sidebarDataMap=SidebarData;
  }//eslint-disable-next-line
  if(props.currentRole==="Manager"){
    sidebarDataMap=SidebarData;
  }//eslint-disable-next-line
  if(props.currentRole==="Developer"){
    sidebarDataMap=SidebarDataDeveloperClient;
  }
  if(props.currentRole==="Clients"){
    sidebarDataMap=SidebarDataDeveloperClient;
  }
  
  console.log("sidebarDataMap:",sidebarDataMap)

  return (
    <div className={`sidebarBox shadow bg-blue ${isFixed ? 'fixedSidebar' : ''}`} style={{backgroundColor:'#ffffff'}}>
      {/* <div className={`sidebarBox shadow bg-${activeBg} ${isFixed ? 'fixedSidebar' : ''}`}> */}
      
        {/********Logo*******/}
        <div className="d-flex p-3 align-items-center">
          <Logo />
          <Button
            size="sm"
            className="ms-auto d-sm-block d-lg-none btn-close btn-sm"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
          </Button>
        </div>
        {/********Sidebar Content*******/}
        <SimpleBar style={{ maxHeight:"600px"}}>
        <div className="p-3 pt-1 mt-2">
          <Nav vertical className={activeBg === 'white' ? '' : 'lightText'}>
              {/* {SidebarData && SidebarData.map((navi) => { */}
            {sidebarDataMap && sidebarDataMap.map((navi) => {
              if (navi.caption) {
                return (
                  <div className="navCaption fw-bold mt-4" key={navi.caption}>
                    {navi.caption}
                  </div>
                );
              }
              if (navi.children) {
                return (
                  <NavSubMenu
                    key={navi.id}
                    icon={navi.icon}
                    title={navi.title}
                    items={navi.children}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    // toggle={() => toggle(navi.id)}
                    // collapsed={collapsed === navi.id}
                    isUrl={currentURL === navi.href}
                  />
                );
              }
              return (
                <NavItemContainer
                  key={navi.id}
                  //toggle={() => toggle(navi.id)}
                  className={location.pathname === navi.href ? 'activeLink' : ''}
                  to={navi.href}
                  title={navi.title}
                  suffix={navi.suffix}
                  suffixColor={navi.suffixColor}
                  icon={navi.icon}
                />
              );
            })}
          </Nav>
        </div>
      </SimpleBar>
    </div>
  );
};

export default connect (mapStateToProps,null)(Sidebar);
