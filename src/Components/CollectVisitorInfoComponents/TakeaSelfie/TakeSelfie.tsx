import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from "react-webcam";


interface Props{
  image:string;
  setImage: (prop:string)=>void;
  setpageHeader: (prop:string)=>void;
  back: ()=>void;
  next: ()=>void;
  firstname: string;
  colorName: (prop:boolean)=>void;
}

export const TakeSelfie:React.FC<Props> = ({image, setImage, setpageHeader, back, next, firstname, colorName}) => {
    
    
    const webcamRef:any = useRef(null);

    const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "user",
    };
    
    const capture = useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        },[]);

        useEffect(() => {
            colorName(true);
            setpageHeader(' smile for the camera')
          }, []);
    return (
        <div className="collect-info">
            <div className="webcam-container">

                {image === '' ? <Webcam
                    audio={false}
                    height={350}
                    style={{borderRadius: '50%', border: '5px solid white'}}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    width={350}
                    videoConstraints={videoConstraints}
                /> : <img src={image} alt='visitorphoto' style={{borderRadius: '50%', border: '5px solid white',
                width:'300px', height:'300px'}}/>}
            
                {image !== '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>

            <button className="navButs prev" onClick={back} >
              <i className='fa fa-chevron-left'></i>
            </button>

            <button onClick={next} className={image? 'showButton navButs next': 'hideButton'}>
            <i className='fa fa-chevron-right'></i>
            </button>
        </div>
    );
}


export function useTakeSelfie() {
    
    const [image,setImage]= useState('');

    return [image, setImage] as const;
}