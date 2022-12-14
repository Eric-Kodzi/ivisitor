import './GuestHistory.css'
import { useEffect, useState } from 'react';

export const GuestHistory:React.FC<{setheader:(prop:string)=>void, user:string}> = ({setheader, user}) => {

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
        setheader('History')
      },[])

      useEffect(() => {
        fetch('/api/visitorlists')
          .then((res) => res.json())
          .then((data) => {
            setVisitors(data.visitorlists.filter((visitor:any) => visitor.host === user))
            console.log(data)
          })
          .catch((err) => console.log(err));
      },[])

    return (
        <div className='user-guest-history'>
           <div className='history-table-container'>
            <h4>History of Visitors</h4>
            <hr></hr>
            {visitors.length < 1? <div className='no-data'>No Data</div>: <table className="styled-table" style={{marginTop:0}}>
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

        </table> }
        </div> 
        </div>
    )
}