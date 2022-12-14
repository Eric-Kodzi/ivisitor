import { useState, useEffect } from "react";
import './SendInvite.css';
import QRCode from 'qrcode';
import emailjs from '@emailjs/browser';

interface Guest {
    firstname: string;
    lastname: string;
    email: string;
    phone:string;
    visitorType?:string;
}

interface User {
    name:string;
    email:string;
}


export const SendInvite:React.FC<{user:User,setheader:(text:string)=>void}> = ({user, setheader}) => {


    const [invitedGuest, setInvitedGuest] = useState<Guest>({firstname:'',lastname:'',email:'',phone:''});
    const [showEmialInvite, setShowEmailInvite] = useState(false);
    const [qrcode, setQrcode] = useState('');

    const showbutton =  Object.keys(invitedGuest).length === 5 && qrcode;
    
    

   const generateQR = () => {
    QRCode.toDataURL(invitedGuest.email, (err:any, url:string) => {
        if(err) return console.error(err);

        console.log(url);
        setQrcode(url);
        // setInvitedGuest({...invitedGuest, qrcode: qrcode, host:user.name})
    })

   }

   useEffect(() => {
    setheader('Invite A Guest')
  },[])

   const saveInvitedGuest = () => {
    fetch('/api/expectedVisitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...invitedGuest, host:user.name}),
      })
      .then((res) => res.json())
      .then((data) => {
        
        alert( data.status)
      })
      .catch((err) => console.log(err));
   }
   
  const emailInvite = () => {
    var templateParams = {
        sender_name: user.name,
        receiver_name: invitedGuest.firstname,
        sender_email: user.email,
        receiver_email: invitedGuest.email,
        reply_to: user.email,
        qrcode_link: qrcode
       };
     
       emailjs.send('service_osgvnui', 'template_l1hc0xi', templateParams, 'MrLX9kv91_12plJoZ')
        .then(function(response) {
           console.log(response)
           saveInvitedGuest()
        }, function(error) {
           console.log('FAILED...', error);
        });
       
  }




     const invitedGuestHandler = (event:any) => {
       setInvitedGuest({...invitedGuest, [event.target.name] : event.target.value})
    }


    return (
    <div className="send-invite">
        {/* <h2>Invite a guest</h2> */}
        
        <div>
            <label htmlFor="fname">Firstname:</label>
            <input id='fname' value={invitedGuest.firstname} onChange={invitedGuestHandler} 
            type='text' name='firstname' placeholder='Firstname' />
        </div>
        <div>
            <label htmlFor="lname">Lastname:</label>
            <input id= 'lname' value={invitedGuest.lastname} onChange={invitedGuestHandler} 
            type='text' name='lastname' placeholder='Lastname' />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input id='email' value={invitedGuest.email} onChange={invitedGuestHandler} 
            type='text' name='email' placeholder='Email' />
        </div>
        <div>
            <label htmlFor="phone">Phone:</label>
            <input id='phone' value={invitedGuest.phone} onChange={invitedGuestHandler} 
            type='text' name='phone' placeholder='Phone' />
        </div>
         

        <label htmlFor="visitors">Select visitor type </label> 
        <select id='visitors' name="type of visitor" value={invitedGuest.visitorType} onChange={invitedGuestHandler} >
            <option value=' '>.......</option>
            <option value='Visitor'>Visitor</option>
            <option value='Contractor'>Contractor</option>
            <option value='Dispatch'>Dispatch</option>
            <option value='Regulator'>Regulator</option>
        </select> 

        <button onClick={generateQR}>Generate QR Code</button>
        <div className="qrcode-display">
        {qrcode && <img src={qrcode} alt="qrcode" />}
        </div>
        <button className={showbutton? "create-invite":"hide"} onClick={() => setShowEmailInvite(true) }>Create Invite</button>


         {
         showEmialInvite && 
         <EmailInvite 
         invitedGuest={invitedGuest} 
         closeEmailPage={setShowEmailInvite}
         emailInvite={emailInvite}
         user={user}
         />
         }
        
    </div>
    )
}

interface Invite {
    invitedGuest: Guest;
    closeEmailPage: (prop:boolean)=>void;
    emailInvite: ()=>void;
    user:User;
}

const EmailInvite:React.FC<Invite> = ({invitedGuest, closeEmailPage, emailInvite, user}) => {
    return(
        <div className="email-invite">
        <div className="email-box">
        <p>
            Hello {invitedGuest.firstname}, you are invited to Amalitech by {user.name}.<br/>
            Scan the qr code below to sign-in when you arrive.<br/>
            Thanks.
        </p>

        <button className="send" onClick={emailInvite}>Send</button>
        <button className="close" onClick={() => closeEmailPage(false)}>Close</button>
    </div>
    </div>
    )
}