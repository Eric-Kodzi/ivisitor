import { useEffect, useState } from "react";
import './VisitorsLog.css';

export const VisitorsLog:React.FC<{setheader:(prop:string)=>void}> = ({setheader}) => {
   
    const [visitors, setVisitors] = useState([{name:'',email:'',phone:'',host:'',image:'',date:'', signIn:'',signOut:'',type:''}]);

   const trows = visitors.map((user) => {
    return (
    <tr>
        <td>{user.name}</td>
        <td><img src={user.image} className='table_image'/></td>
        <td>{user.type}</td>
        <td>{user.host}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>{user.date}</td>
        <td>{user.signIn}</td>
        <td>{user.signOut}</td>
    </tr>
    )
   })
    
   useEffect(() => {
    setheader('Visitors')
  },[])

    useEffect(() => {
        fetch('/api/visitorlists')
          .then((res) => res.json())
          .then((data) => {
            setVisitors(data.visitorlists)
            console.log(data)
          })
          .catch((err) => console.log(err));
      },[])


    return(
        <div className="admin-visitors-log">
        {/* <div className="header"><span>Visitors</span></div> */}
        {visitors.length>1 &&<table className="styled-table">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Photo</td>
                    <td>Category</td>
                    <td>Host</td>
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
    )
}