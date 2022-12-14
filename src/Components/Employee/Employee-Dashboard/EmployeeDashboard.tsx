import { useEffect, useState } from 'react';
import './EmployeeDashboard.css';




export const EmployeeDashboard:React.FC<{setheader:(prop:string)=>void, user:string}> = ({setheader, user}) => {

    const [visitors, setVisitors] = useState([{name:'',email:'',phone:'',image:'',date:'', signIn:'',signOut:'',type:''}]);

   const trows = visitors.map((user) => {
    return (
    <tr>
        <td>{user.name}</td>
        <td><img src={user.image} className='table_image'/></td>
        <td>{user.type}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>{user.date}</td>
        <td>{user.signIn}</td>
        <td>{user.signOut}</td>
    </tr>
    )
   }) 

    useEffect(() => {
        setheader('Dashboard')
      },[])
    
      useEffect(() => {
        fetch('/api/visitorlists')
          .then((res) => res.json())
          .then((data) => {
            setVisitors(data.visitorlists.filter((visitor:any)=>visitor.signOut === '' && visitor.host === user))
            console.log(data)
          })
          .catch((err) => console.log(err));
      },[])


    return (
        <div className='employee-dashboard'>
            <div className='stats-one-container employee-stats-width'>
          <div className='stats-one box-1'>
            <div className='stats-one-inner'>
              <span className='value1'>89</span>
              <span className='gray-text'>Invites Sent</span>
            </div>
            <i className='fa fa-bank'></i>
          </div>
          <div className='stats-one box-2'>
          <div className='stats-one-inner'>
              <span className='value2'>112</span>
              <span className='gray-text'>Visits this month</span>
            </div>
            <i className='fa fa-sign-out'></i>

          </div>
          <div className='stats-one box-3'>
           <div className='stats-one-inner'>
              <span className='value3'>267</span>
              <span className='gray-text'>Total Visists</span>
            </div>
            <i className='fa fa-bar-chart'></i>
           </div>
          {/* <div className='stats-one box-4'>
            <div className='stats-one-inner'>
              <span className='value4'>165</span>
              <span className='gray-text'>Visitors this month</span>
            </div>
            <i className='fa fa-line-chart'></i>
           </div> */}
         </div> 
         <div className='table-container'>
         <div className='recent-visits'>
          <h4>Current Visitors On Premises</h4>  
          <hr></hr>
         {trows.length<1? <div className='no-data'>No Data</div> : <table className="styled-table" style={{marginTop:0}}>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Photo</td>
                    <td>Category</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>Date</td>
                    <td>Time In</td>
                    <td>Time Out</td>
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>

        </table>}

         </div>
         </div>
        </div>
    )
}