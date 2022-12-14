import './Visitor.css';
import { Link } from "react-router-dom";
import Logo from './grey-logo.png';
import { useEffect, useState } from 'react';
import { getTime } from '../CollectVisitorInfoComponents/VisitorinfoConfirm/VisitorInfoConfirm';
import { useNavigate } from 'react-router-dom';


export default function Visitor() {

    const [color, setColor] = useState(false);
    const [signout, setSignout] = useState(false);

    const navigate = useNavigate();
    const backwards = () => navigate(-1);
    

   useEffect(()=>{
     setTimeout(function () {
        setColor(!color);
      }, 500);
    },[color]);
    

    return (
        <div>
            {signout && <VisitorSignout closePage={setSignout}/>}
            
            <div className='visitors-page-footer'>
                 <div><img src={Logo}/></div>
                <div className='in-out-container'>
                 
                 
                 <Link to="/ivisitor/visitor/authentication">
                    <div className='in-out-box'>
                       <i className="fa fa-sign-in" style={{fontSize:'40px', color: color?'green':'transparent'}}></i>
                       <span>Sign-In</span> 
                    </div>
                 </Link>
                 
                     <div className='in-out-box'>
                       <i className="fa fa-sign-out" style={{fontSize:'40px', color: color?'red':'transparent'}}></i>
                       <span className='signout-text' onClick={()=>setSignout(true)}>Sign-Out</span>
                     </div>
                 
                </div>
                <i className='fa fa-long-arrow-left' onClick={backwards}></i>
            </div>
        </div>
    )
}



const VisitorSignout:React.FC<{closePage:(prop:boolean)=>void}> = ({closePage}) => {
  const [signoutID, setSignoutID] = useState('');
  const [status, setStatus] = useState('');
  
  

const signout = () => {

  fetch(`/api/visitorlists/${signoutID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({signOut: getTime()}),
  })
  .then((res) => res.json())
  .then((data) => {
    
    setStatus(data.status)
    console.log( data.status)
  })
  .catch((err) => console.log(err));

}




  return (
    <div className='visitor-signout-page'>
       <i className='fa fa-close' onClick={()=> closePage(false)}></i>
    <div className={status?'visitor-signout-box hide' : 'visitor-signout-box'} >
     
      <input type="text" placeholder="enter your Visitor's ID to sign-out" value={signoutID} 
      onChange={(ev)=>setSignoutID(ev.target.value)}/>
      <button onClick={()=> signout()}>Sign-Out</button>
      
    </div>
    {status && <Success status={status}/>}
    </div>
  )
}


const Success:React.FC<{status:string}> = ({status}) => {

  return(
    <div className='success-dialog'>
      <h3>{status}</h3>
      <span>Thanks for coming</span>
    </div>
  )
}