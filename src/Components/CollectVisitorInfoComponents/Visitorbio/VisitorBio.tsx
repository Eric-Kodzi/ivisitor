import { useState, useEffect } from "react";

export interface Visitor {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface Props {
  visitorDetails: Visitor;
  visitorDetailsHandler: (e:any)=>void;
  setpageHeader: (prop:string)=>void;
  back: ()=>void;
  next: ()=>void;
}

export const VisitorBio: React.FC<Props> = ({visitorDetails, visitorDetailsHandler, setpageHeader, back, next}) =>{

  const filled = visitorDetails.firstname && visitorDetails.lastname && visitorDetails.email && visitorDetails.phone;

  useEffect(() => {
    setpageHeader('Fill in your details')
  }, []);
    return (
      <div className="collect-info">
       
        <div className='visitor-info'>
                <form>
                    <div className="bio-input" >
                        <i className="fa fa-user"></i>
                       <input id='fname' value={visitorDetails.firstname} onChange={visitorDetailsHandler} 
                       type='text' name='firstname' placeholder='Firstname' className="input-style-short"/>
                    </div>
                    <div className="bio-input" >
                      <i className="fa fa-user-o"></i>
                      <input id= 'lname' value={visitorDetails.lastname} onChange={visitorDetailsHandler} 
                      type='text' name='lastname' placeholder='Lastname' className="input-style-short"/>
                    </div>
                    <div className="bio-input" >
                      <i className="fa fa-envelope"></i>
                      <input id='email' value={visitorDetails.email} onChange={visitorDetailsHandler} 
                      type='text' name='email' placeholder='Email' className="input-style-short"/>
                    </div>
                    <div className="bio-input" >
                      <i className="fa fa-phone"></i>
                      <input id='phone' value={visitorDetails.phone} onChange={visitorDetailsHandler} 
                      type='text' name='phone' placeholder='Phone' className="input-style-short"/>
                    </div>

                </form> 
        </div>
        <button className="navButs prev" onClick={back} >
              <i className='fa fa-chevron-left'></i>
            </button>

            <button onClick={next} className={filled? 'showButton navButs next': 'hideButton'}>
            <i className='fa fa-chevron-right'></i>
            </button>

        </div>
    )
}


export function useVisitorBio() {

   const [visitorDetails, setVisitorDetails] = useState<Visitor>({firstname:'',lastname:'',email:'',phone:''});


   const visitorDetailsHandler = (event:any) => {

    setVisitorDetails({...visitorDetails, [event.target.name] : event.target.value})
   }

  return [visitorDetails, visitorDetailsHandler, setVisitorDetails] as const
}