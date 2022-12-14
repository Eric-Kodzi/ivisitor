import './VisitorAuthentication.css';
import { useState } from 'react';
import { TypeOfVisitor, useTypeOfVisitor } from '../CollectVisitorInfoComponents/TypeofVisitor/TypeOfVisitor';
import { SignInOptions, useSignInOptions } from '../CollectVisitorInfoComponents/SigninOptions/SignInOptions';
import { VisitorBio, useVisitorBio } from '../CollectVisitorInfoComponents/Visitorbio/VisitorBio';
import { SelectHost, useSelectHost } from '../CollectVisitorInfoComponents/Selecthost/SelectHost';
import { TakeSelfie, useTakeSelfie } from '../CollectVisitorInfoComponents/TakeaSelfie/TakeSelfie';
import { VisitorInfoConfirm } from '../CollectVisitorInfoComponents/VisitorinfoConfirm/VisitorInfoConfirm';
import { ContactHost } from '../CollectVisitorInfoComponents/ContactHost/ContactHost';




export default function VisitorAuth() {
    

  const [visitorType, setVisitorType] = useTypeOfVisitor();
  const [scanResult,handleScanWebCam] = useSignInOptions();
  const [visitorDetails, visitorDetailsHandler, setVisitorDetails] = useVisitorBio();
  const [image, setImage] = useTakeSelfie();
  const [host, setHost] = useSelectHost();
  const [hostemail, setHostemail] = useState('');
  const [hostimage, setHostimage] = useState('');
  const [pageHeader, setpageHeader] = useState('');
  const [selfiename, setSelfiename] = useState(false);
  const [visitorID, setVisitorID] = useState('');
  const [inputPage, setInputPage] = useState(0);

  const prevInputHandler = () => {
    setInputPage((prev) => prev - 1)
  }

  const nextInputHandler = () => {
    setInputPage((prev) => prev + 1)
  }

  const inputPages = [

    <SignInOptions 
    scanResult={scanResult}
    handleScanWebCam={handleScanWebCam}
    setInputPage={setInputPage}
    setpageHeader={setpageHeader}
    setVisitorDetails={setVisitorDetails}
    setHost={setHost}
    setVisitorType={setVisitorType}
    next={nextInputHandler}
    
    />,

    <TypeOfVisitor
    visitorType={visitorType}
    setVisitorType={setVisitorType}
    setpageHeader={setpageHeader}
    next={nextInputHandler}
    back={prevInputHandler}
    />,

    <VisitorBio
    visitorDetails={visitorDetails}
    visitorDetailsHandler={visitorDetailsHandler}
    setpageHeader={setpageHeader}
    next={nextInputHandler}
    back={prevInputHandler}
    />,

    <SelectHost 
     host={host}
     setHost={setHost}
     setpageHeader={setpageHeader}
     next={nextInputHandler}
     back={prevInputHandler}
     hideName={setSelfiename}
     setHostemail={setHostemail}
     setHostimage={setHostimage}
    />,

    <TakeSelfie 
      setImage={setImage}
      image={image}
      setpageHeader={setpageHeader}
      next={nextInputHandler}
      back={prevInputHandler}
      firstname={visitorDetails.firstname}
      colorName={setSelfiename}
    />,
    <VisitorInfoConfirm 
      visitorDetails={visitorDetails}
      setpageHeader={setpageHeader}
      visitorType={visitorType}
      image={image}
      host={host}
      back={prevInputHandler}
      nextpage={setInputPage}
      hideName={setSelfiename}
      setID={setVisitorID}
    />,

    <ContactHost 
      host={host}
      visitorDetails={visitorDetails}
      setpageHeader={setpageHeader}
      visitorID={visitorID}
      hostemail={hostemail}
      hostimage={hostimage}
    />,
  
];
  const inputPageToDisplay = inputPages[inputPage];

  

    return (
        <>
        <div className='visitor-auth-header'>
            <h3>{ selfiename && <span className='name-styleP'>{visitorDetails.firstname +','}</span>}{pageHeader}</h3> 
        </div>
        {inputPageToDisplay}
        </>
    )
}