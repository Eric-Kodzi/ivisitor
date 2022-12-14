import { useState, useEffect} from "react";
import user from './user.png';



interface Props {
  host:string;
  setHost: (prop:string)=>void;
  setpageHeader: (prop:string)=>void;
  back: ()=>void;
  next: ()=>void;
  hideName: (prop:boolean)=>void;
  setHostemail: (prop:string)=>void;
  setHostimage:(prop:string)=>void;
}

export const SelectHost:React.FC<Props> = ({host, setHost,setHostemail,setHostimage, setpageHeader,back,next,hideName}) => {

  const [employees, setEmployees] = useState([]);

  

  const filtered = employees? employees.filter( (worker:any) => worker.name.toLowerCase().includes(host.toLowerCase())): [];
  
 
  useEffect(() => {
    hideName(false)
    setpageHeader('Who are you visiting?')
  }, []); 

  useEffect(() => {
    fetch('/ivisitor/api/employees')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.employees)
      })
      .catch((err) => console.log(err));
  },[])
  
    return (
        <div className="collect-info">
            <div className="select-host-container">
              <input type="text" value={host} placeholder=" I am here to see ...." name='host' 
              onChange={(event) => setHost(event.target.value)} className="input-style"/>
            </div>
            <div className="show-hosts-container">
              {host && filtered.map((employee:any,index:number) => <Host key={index} host={employee} setHost={setHost} setEmail={setHostemail} setHostimage={setHostimage} />)} 
            </div>

            
            <button className="navButs prev" onClick={back} >
              <i className='fa fa-chevron-left'></i>
            </button>

            <button onClick={next} className={host? 'showButton navButs next': 'hideButton'}>
            <i className='fa fa-chevron-right'></i>
            </button>

        </div>
      )
}


export function useSelectHost() {
  const[host, setHost] = useState<string>('');

  return [host, setHost] as const;
}

interface Host {
  name: string;
  photo: string;
  position: string
  email: string
}

interface Hprops {
  host:Host
  setHost:(prop:string)=>void
  setEmail:(prop:string)=>void
  setHostimage:(prop:string)=>void
}

const Host:React.FC<Hprops> = ({host, setHost,setEmail,setHostimage}) =>{
  return(
    <div className="host-profile" onClick={()=>{setHost(host.name);setEmail(host.email);setHostimage(host.photo)}}>
      <img src={host.photo? host.photo : user} alt="foto" />
      <div className="host-profile-text">
        <h3>{host.name}</h3>
        <span>{host.position}</span>
      </div>
      
    </div>
  )
}


