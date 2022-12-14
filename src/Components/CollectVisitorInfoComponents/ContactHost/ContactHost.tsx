import emailjs from '@emailjs/browser'; 
import { useState, useEffect} from 'react';
import { Visitor } from '../Visitorbio/VisitorBio';
import { useNavigate } from 'react-router-dom';
import calling  from './calling.png'

interface Props {
  host: string;
  setpageHeader: (prop:string)=>void;
  visitorDetails: Visitor;
  visitorID: string;
  hostemail:string;
  hostimage:string;
}


export const ContactHost:React.FC<Props> = ({host, visitorDetails, setpageHeader, visitorID, hostemail, hostimage}) => {

   
    const [showcall, setShowcall] = useState(false)
    const [emailsuccess, setEmailsuccess] = useState(false)
    const navigate = useNavigate();

    

     const endsession = () =>{
        const handleClick = () => navigate('/visitor');
        setTimeout(handleClick, 10000)
     }

     useEffect(()=>{
      setTimeout(function () {
         setShowcall(!showcall);
       }, 500);
     },[showcall]);

   

    useEffect(() => {
      setpageHeader('Contacting your host.....');

      var templateParams = {
      to_name: host,
      email_to: hostemail,
      visitor_name: visitorDetails.firstname,
      visitor_phone: visitorDetails.phone
     };
   
     emailjs.send('service_osgvnui', 'template_ij69y0c', templateParams, 'MrLX9kv91_12plJoZ')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
         setpageHeader('Contact Successful');
         setEmailsuccess(true);
         endsession();
      }, function(error) {
         console.log('FAILED...', error);
      });
     
      },[0])

      

    return (
        <div className='collect-info'>
            {emailsuccess && <ContactSuccess host={host} id={visitorID} />}
            <div className={emailsuccess? 'hide':'call-image'}>
               <img src={hostimage} style={{width:'150px', height:'150px', display:'inline-block', marginRight:'50px'}} alt="foto" />
               <img src= {calling} alt="calling" style={{}} className= {showcall? '':'hide'}/>
            </div>
         </div>
      )
}




const ContactSuccess:React.FC<{host:string,id:string}> = ({host,id}) => {
   return (
      <div className='contact-success'>
         <p><span className='name-style'>{host}</span> has been contacted.</p>
         <p>Wait patiently in the lobby for him.</p>
         <p>Keep your <span className='name-style'>ID</span> number, <span className='name-style'>{id}</span> - you will need it to sign-out.</p>
         <p>Thanks</p>
      </div>
   )
}