
import { useEffect } from 'react';
import { Visitor } from '../Visitorbio/VisitorBio';



interface Confirm {
  visitorDetails: Visitor;
  image: string;
  visitorType: string;
  host: string;
  setpageHeader: (prop:string)=>void;
  back: ()=>void;
  nextpage: (prop:number)=>void;
  hideName: (prop:boolean)=>void;
  setID: (prop:string)=>void;
}

export const VisitorInfoConfirm: React.FC<Confirm> = ({visitorDetails, image, visitorType, host, setpageHeader,back,nextpage,hideName,setID}) => {

  

  const dispatchPayload = {
    name: visitorDetails.firstname + ' ' + visitorDetails.lastname,
    email: visitorDetails.email,
    phone: visitorDetails.phone,
    host: host,
    image:image,
    date: getDate()
  
  }

  useEffect(() => {
    hideName(false);
    setpageHeader('Confirm your details')
  }, []);

  // let [users, setUsers] = useState([]);
  // useEffect(() => {
  //   fetch("/api/visitorlists")
  //     .then((response) => response.json())
  //     .then((json) => setUsers(json))
  // }, [])

  

  const post = () => {
  
    fetch('/api/visitorlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...dispatchPayload, signIn: getTime()}),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.visitorlist) {nextpage(6)}
      setID( data.visitorlist.id)
      console.log( data.visitorlist.id)
    })
    .catch((err) => console.log(err));
  }

    return (
        <div className="collect-info">
              
              <div className ='confirm-container'>
                <img src={image} style={{width:'200px', height:'200px', borderRadius:'50%', border: '2px solid white'}}/>
                <div className="details-to-confirm">
                  <span>Name: {visitorDetails.firstname + ' ' + visitorDetails.lastname}</span><br/>
                  <span>Email: {visitorDetails.email}</span><br/>
                  <span>Phone: {visitorDetails.phone}</span><br/>
                  <span>Kind of guest: I am a {visitorType}</span><br/>
                  <span>I am visiting {host}</span><br/>
                  
                  <button onClick={()=>post()}>Confirm</button>
                  
                </div>
              </div>
              <button className="navButs prev" onClick={back} >
              <i className='fa fa-chevron-left'></i>
            </button>

            
        </div>
      )
}





export const getTime = () => {
  const currentDate = new Date();
  const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
  return currentTime;
}

export const getDate = () => {
  const current_date = new Date();
  const currentDate = current_date.getDate();
  const currentMonth = current_date.getMonth();
  const currentYear = current_date.getFullYear();
  const dateNow = `${currentDate}-${currentMonth}-${currentYear}`;
  return dateNow;
}