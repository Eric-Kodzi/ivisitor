import { useState, useEffect } from 'react';
import './AddEmployee.css';
import userp from './userp.png';



export interface Employee {
    name: string;
    phone: string;
    email: string;
    department: string;
    position: string;
    photo: string;
}

const employee = {
    name:'',
    phone:'',
    email:'',
    department:'',
    position:'',
    photo: ''

}

export const AddEmployee:React.FC<{setheader:(prop:string)=>void}> = ({setheader}) => {

    const [employeeInfo, setEmployeeInfo] = useState<Employee>({...employee});
    // const [confirmProfile, setConfirmProfile] = useState(false);
    const [employees, setEmployees] = useState([{name:'',position:'',department:'',email:'',phone:'',photo:''}]);
    const [showform, setShowform] = useState(false);

   const trows = employees.map((user) => {
    return (
    <tr>
        <td>{user.name}</td>
        <td><img src={user.photo? user.photo : userp} className='table_image'/></td>
        <td>{user.position}</td>
        <td>{user.department}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td><button>Edit</button><button>Remove</button></td>
    </tr>
    )
   })


    const employeeInfoNameHandler = (ev: { target: { name: string; value: string; }; }) => {
        setEmployeeInfo({...employeeInfo, 
        [ev.target.name]:ev.target.value})
     }

     useEffect(() => {
        setheader('Employees')
      },[])

     useEffect(() => {
        fetch('/api/employees')
          .then((res) => res.json())
          .then((data) => {
            setEmployees(data.employees)
            console.log(data)
          })
          .catch((err) => console.log(err));
      },[showform])

      const post = () => {
  
        fetch('/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...employeeInfo}),
        })
        .then((res) => res.json())
        .then((data) => {
        
          console.log( data.status)
        })
        .catch((err) => console.log(err));
      }

    return(
        <div className='add-employee'> 
        {/* <div className="header"><span>Employees</span></div> */}
        <div className= {!showform? " ": "hide"}>
        {employees.length>1 && <table className= "styled-table">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Photo</td>
                    <td>Position</td>
                    <td>Department</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                { trows}
            </tbody>
        </table>}
        <button className='add-button' onClick={()=>setShowform(!showform)}>+ Add</button>
     </div>
     <div className= {showform? " ": "hide"}>
        <form action="" className="add-employee-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Name" 
            onChange={employeeInfoNameHandler} 
            value={employeeInfo.name}/>

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" placeholder="Phone"
            onChange={employeeInfoNameHandler} 
            value={employeeInfo.phone}
            />

            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="Email"
            onChange={employeeInfoNameHandler} 
            value={employeeInfo.email}
            />

            <label htmlFor="department">Department:</label>
            <input type="text" id="department" name="department" placeholder="Department"
            onChange={employeeInfoNameHandler} 
            value={employeeInfo.department}
            />

            <label htmlFor="position">Position:</label>
            <input type="text" id="position" name="position" placeholder="Position"
            onChange={employeeInfoNameHandler} 
            value={employeeInfo.position}
            />

            <label htmlFor="photo">Image:</label>
            <input type="file" id="photo" name="photo" 
            onChange={employeeInfoNameHandler} 
            value={employeeInfo.photo}
            />


        </form>
            <button className='create-profile-button' onClick={()=> {post(); setShowform(!showform);setEmployeeInfo(employee)}}>Create Profile</button>
            {/* {confirmProfile? <ConfirmProfile profile={employeeInfo} closePage={setConfirmProfile}/> : null} */}
            
           
        </div>
        </div>
    )
}



// const ConfirmProfile: React.FC<{profile: Employee,closePage: (prop: boolean)=>void}> = ({profile, closePage }) => {

//     const post = () => {
  
//         fetch('/api/employees', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({...profile}),
//         })
//         .then((res) => res.json())
//         .then((data) => {
        
//           console.log( data.status)
//         })
//         .catch((err) => console.log(err));
//       }
    
   

//     return (
//         <div className='confirm-employee-profile'>
//             <h2>Confirm Details & Save</h2>
//             <span><strong>Fullname:</strong> {profile.firstname +' ' + profile.lastname}</span><br/>
//             <span><strong>Email:</strong> {profile.email}</span><br/>
//             <span><strong>Department:</strong> {profile.department}</span><br/>
//             <span><strong>Position:</strong> {profile.position}</span>
//             <button id='save-confirm-page' onClick={() => post()}>Save</button>
//             <button id='close-confirm-page' onClick={() => closePage(false)}>Close</button>
//         </div>
//     )
// }