import { useState, useEffect } from "react";

interface Props {
    visitorType: string;
    setVisitorType:(prop:string)=>void;
    setpageHeader: (prop:string)=>void;
    back: ()=>void;
    next: ()=>void;
}

export const TypeOfVisitor: React.FC<Props> = ({visitorType, setVisitorType, setpageHeader, back, next}) => {

    const [showOptions, setshowOptions] = useState(false);
    useEffect(() => {
        setpageHeader("Let's know who you are.")
      }, []);
    return (
    <div className="collect-info">
        <div className="type-of-visitor">

            <input 
            className="input-style"
            onFocus={()=> setshowOptions(!showOptions)} 
            type="text" 
            placeholder="I am a ......"
            value={visitorType}
            onChange={(event) => setVisitorType(event.target.value)}
            />
            {showOptions && <SelectOptions setVisitorType={setVisitorType} visitorType={visitorType}/>}
        

        </div>
        <button className="navButs prev" onClick={back} >
              <i className='fa fa-chevron-left'></i>
            </button>

            <button  onClick={next} className={visitorType? 'showButton navButs next': 'hideButton'}>
            <i className='fa fa-chevron-right'></i>
            </button>

     </div>
      )
}



export function useTypeOfVisitor() {
    const [visitorType, setVisitorType] = useState<string>('');

    // const selectVisitorHandler = (event:any) => {
    //     setVisitorType(event.target.value);
    // }

    return [visitorType, setVisitorType] as const;
}

const SelectOptions:React.FC<{setVisitorType:(prop:string)=>void, visitorType:string}> = ({setVisitorType, visitorType}) => {

    const options = ['Dispatch', 'Contractor', 'Guest', 'Regulator']
    const display = options.map( (option,index) => 
    <div key={index} className= {option === visitorType? 'active-option type-option': 'type-option'} onClick={()=>setVisitorType(option)}>
        {option}
    </div>)

    return (
    <div className="visitor_type_options">
        {display}
    </div>
    )
}