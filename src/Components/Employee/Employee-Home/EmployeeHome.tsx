import './EmployeeHome.css';
import { useState } from 'react';
import { EmployeeDashboard } from '../Employee-Dashboard/EmployeeDashboard';
import { SendInvite } from '../Send-Invite/SendInvite';
import { Invites } from '../Invites/Invites';
import { GuestHistory } from '../Guest-History/GuestHistory';
import { Settings } from '../Settings/Settings';

interface User{
  name: string;
  photo: string;
  position: string;
  email: string;
}


export const EmployeeHome:React.FC<{user: User}> = ({user}) => {
  
  const [headertext, setHeadertext] = useState('');
  const [employeePage, setEmployeePage] = useState(0);
  const employeePages = [<EmployeeDashboard setheader={setHeadertext} user={user.name}/>, <SendInvite user={user} setheader={setHeadertext}/>, <Invites setheader={setHeadertext} user={user.name}/>, <GuestHistory setheader={setHeadertext} user={user.name}/>, <Settings setheader={setHeadertext}/>];
  const currentEmployeePage = employeePages[employeePage];
  // console.log(user.name)
  
    return (
        <div >
        
        <div className="employee-homepage">
             <div></div>
            <div className='employee-task-page'>
                { currentEmployeePage }
            </div>
            
          </div>
          <div className='employee-tasks-panel'>
                <div className='profile-image-container'>
                  <img src={user.photo} alt="picture" /> 
                  <span>{user.name}</span><br/>
                  <span>{user.position}</span>
                </div>
                <EmployeeMenu 
                  setUserPage={setEmployeePage}
                />
          </div>
          <div className='admin-page-header'>
              <div></div>
              <div className='header-container'>
                <div>{headertext}</div>
                <div>
                  <i className='fa fa-bell'></i>
                  <i className='fa fa-envelope'></i>
                </div>
              </div>
            </div>
        </div>
    )
}




const EmployeeMenu:React.FC<{setUserPage:(prop:number)=>void}> = ({ setUserPage }) => {

   const [activeMenu, setActiveMenu] = useState('');

   const menuListNames = [
    'Dashboard',
    'Send Invite', 
    'Invites',
    'Guest History', 
    'Settings', 
    'Sign Out'
 ]  

 const menuIcons = [
  'fa fa-bar-chart',
  'fa fa-plus',
  'fa fa-handshake-o',
  'fa fa fa-rss',
  'fa fa-gear',
  'fa fa-sign-out'
]

   const menuList = menuListNames.map((name, index) => 
   <li 
   className={activeMenu === name? 'active-menu-item' : ''} 
   onClick={()=>{setUserPage(index); setActiveMenu(name)}}>
    <i className={menuIcons[index]}></i>          {name}
   </li>)


  return (
         <ul className='employee-menu'>
            { menuList }
         </ul>
  )
}