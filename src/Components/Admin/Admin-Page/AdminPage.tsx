import './AdminPage.css';
import { AddEmployee } from '../Add-Employee/AddEmployee';
import { VisitorsLog } from '../Visitors-Log/VisitorsLog';
import { AdminDashboard } from '../Admin-Dashboard/AdminDashboard';
import { useState } from 'react';
import AdminPic from './admin_pic1.jpg';
import { text } from 'stream/consumers';





export function AdminPage() {
  
  const [adminPage, setAdminPage] = useState(0);
  const [headertext, setHeadertext] = useState('');
  const adminPages = [<AdminDashboard setheader={setHeadertext}/>, <AddEmployee setheader={setHeadertext}/>, <VisitorsLog setheader={setHeadertext}/>];
  const currentAdminPage = adminPages[adminPage];
  
    return (
        <>
        
        <div className="admin-homepage">
            <div></div>
            
            <div className='task-page'>
                { currentAdminPage }
            </div>
            
          </div>
          <div className='admin-tasks-panel'>
                <div className='profile-image-container'>
                  <img src={AdminPic} alt="picture" />
                  <span>Martin Hecker</span><br/>
                  <span>CEO & Founder</span>
                </div>
                <AdminMenu 
                  setAdminPage={setAdminPage}
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
        </>
    )
}




const AdminMenu: React.FC<{setAdminPage: (prop:number)=>void}> = ({ setAdminPage }) => {

   const [activeMenu, setActiveMenu] = useState('');

   const menuListNames = [
    'Dashboard',
    'Employees', 
    'Visitors', 
    'Settings', 
    'Sign Out'
 ]  

  const menuIcons = [
     'fa fa-bar-chart',
     'fa fa-plus',
     'fa fa-bar-chart',
     'fa fa-gear',
     'fa fa-sign-out'
  ]

   const menuList = menuListNames.map((name, index) => 
   <li 
   className={activeMenu === name? 'active-menu-item' : ''} 
   onClick={()=>{setAdminPage(index); setActiveMenu(name)}}>
    <i className={menuIcons[index]}></i>     {name}
   </li>)


  return (
         <ul className='admin-menu'>
            { menuList }
         </ul>
  )
}