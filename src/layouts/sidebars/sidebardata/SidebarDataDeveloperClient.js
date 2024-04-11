// import * as Icon from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faCalendarDays} from '@fortawesome/free-solid-svg-icons'

const SidebarData = [
  

  {
    title: 'Dashboard',
    href: '/',
    icon:<FontAwesomeIcon icon={faBars} />,
    id: 1.1,
    collapisble: false,
  },
  
 {caption:'Timesheet'},
 {
  title: 'My Timesheet',
    href: '/app/timesheet',
    // icon: <Icon.FileText />,
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    id: 4.1,
    collapisble: false,
 },
 {
  title: 'My Team Timesheet',
    href: '/app/myteamtimesheet',
    // icon: <Icon.FileText />,
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    id: 4.1,
    collapisble: false,
 },

 

];

export default SidebarData;
