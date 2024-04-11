import * as Icon from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTruck ,faBars} from '@fortawesome/free-solid-svg-icons'

const SidebarData = [
  

  {
    title: 'Dashboards',
    href: '/',
    icon:<FontAwesomeIcon icon={faBars} />,
    id: 1.1,
    collapisble: false,
  },
  
 {caption:'Master'},
 {
  title: 'Time Sheet',
    href: '/app/timesheet',
    // icon: <Icon.FileText />,
    icon: <FontAwesomeIcon icon={faTruck} />,
    id: 4.1,
    collapisble: false,
 },
  { caption: 'User Management' },
  {
    title: 'User List',
    href: '/app/users',
    icon: <Icon.Users />,
    id: 5.1,
    collapisble: false,
  },
  // {
  //   title: 'Roles',
  //   href: '/app/roles',
  //   icon: <Icon.AlertCircle />,
  //   id: 5.2,
  //   collapisble: false,
  // },

];

export default SidebarData;
