import { useEffect } from 'react';

export const Settings:React.FC<{setheader:(prop:string)=>void}> = ({setheader}) => {

    useEffect(() => {
        setheader('Settings')
      },[])

    return (
        <div>
        
        </div>
    )
}