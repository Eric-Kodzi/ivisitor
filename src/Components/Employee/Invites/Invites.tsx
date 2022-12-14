import { useEffect, useState } from 'react';
import './Invites.css'

export const Invites:React.FC<{setheader:(prop:string)=>void, user:string}> = ({setheader, user}) => {


    const [visitors, setVisitors] = useState([{firstname:'', lastname: '',email:'',phone:'',type_of_visitor:''}]);

   const trows = visitors.map((user) => {
    return (
    <tr>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.type_of_visitor}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td><button>Cancel</button></td>
        
    </tr>
    )
   })


    useEffect(() => {
        setheader('Expected Visists')
      },[])

      useEffect(() => {
        fetch('/api/expectedVisitors')
          .then((res) => res.json())
          .then((data) => {
            setVisitors(data.expectedVisitors.filter((visitor:any) => visitor.host === user))
            console.log(data)
          })
          .catch((err) => console.log(err));
      },[])

    return (
        <div className='expected-visits'>
           <div className='invites-table-container'>
            <h4>Expected Visitors</h4>
            <hr></hr>
             {visitors.length<1? <div className='no-data'>No Data</div> : <table className="styled-table" style={{marginTop:0}}>
            <thead>
                <tr>
                    <td>Firstname</td>
                    <td>Lastname</td>
                    <td>Category</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>

        </table>}
        </div> 
        </div>
    )
}