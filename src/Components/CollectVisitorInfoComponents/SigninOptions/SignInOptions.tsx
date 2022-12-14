import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useEffect } from 'react';
import { Visitor } from '../Visitorbio/VisitorBio';
import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux';

interface Newvisitor {
   firstname:string;
   lastname:string;
   email: string;
   phone: string;
   host: string;
   type_of_visitor:string;
}

interface Props {
  scanResult?: string;
  handleScanWebCam: (result:any)=>void;
  setInputPage: (prop:number)=>void;
  setpageHeader: (prop:string)=>void;
  setVisitorDetails: (prop:Visitor)=>void;
  setHost: (prop:string)=>void;
  setVisitorType: (prop:string)=>void;
  next: ()=>void;
}

export const SignInOptions:React.FC<Props> = ({scanResult,handleScanWebCam,setInputPage, setpageHeader, setVisitorDetails, setHost, setVisitorType, next}) => {
  
  const [showQrReader, setShowQrReader] = useState(false);
  // const expectedVisitors = null;

  const newVisitor:Newvisitor = {firstname:'',lastname:'',email:'',phone:'',host:'',type_of_visitor:''};
 

    if (newVisitor.firstname) {
        setVisitorDetails({
          firstname: newVisitor.firstname,
          lastname: newVisitor.lastname,
          email: newVisitor.email,
          phone: newVisitor.phone
        });
        setHost(newVisitor.host)
        setVisitorType(newVisitor.type_of_visitor)
        setInputPage(4)
    }
  
    useEffect(() => {
      setpageHeader('Choose An Option To Continue')
    }, []);

    const navigate = useNavigate();

    const backwards = () => navigate(-1);
    
    return (
      
      <div className = 'sign-in-options'>
          <div className='right-border-div'>
          <div className='visitor-directives'>
            <i className='fa fa-barcode' style={{fontSize: '48px'}} onClick={()=> setShowQrReader(!showQrReader)}></i><br/>
            <span>Scan qr code to continue...</span>
            { showQrReader? 
            <div className='qr-reader-page'>
              <span className='close-qr-reader' onClick={()=> setShowQrReader(!showQrReader)}>CLOSE</span>
            <QrReader 
            scanDelay={300}
            constraints={{facingMode:'user'}}
            onResult={handleScanWebCam}
            videoStyle={{backgroundColor:'white'}}
           /></div> :
           null
           }
          
          </div>
          </div>
          <div className='visitor-directives'>
            <i className='fa fa-edit' style={{fontSize: '48px'}}></i><br/>
            <span >Click 'next' to fill a form...</span>
          </div>

          <button className="navButs prev" onClick={backwards} >
              <i className='fa fa-chevron-left'></i>
            </button>

          <button className='navButs nextbut next' onClick={next} >
            <i className='fa fa-chevron-right'></i>
          </button>
      </div>
    );
  };
      


  export function useSignInOptions() {

    const [scanResult, setScanResult] = useState('');
    const handleScanWebCam = (result:any) => {
      if(result) {
          console.log(result.text)
         setScanResult(result.text);
      }
    }
     return [scanResult,handleScanWebCam] as const;
  }