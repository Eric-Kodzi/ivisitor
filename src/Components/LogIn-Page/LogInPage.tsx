import './LogInPage.css';
import{ useNavigate } from 'react-router-dom';


interface Props {
    usernameHandler: (event:any)=>void;
    passwordHandler: (event:any)=>void;
    login: ()=>void;
}


export const LogInPage:React.FC<Props> = ({usernameHandler, passwordHandler, login}) => {

    const navigate = useNavigate();
    const backwards = () => navigate(-1);
    
    return (
        <>
        <div className="login-form">
            <h3>Enter your login details</h3>
            <label htmlFor="username">Email:</label>
            <input name='username/email' typeof='text' id='username' placeholder='Email' onChange={usernameHandler}/>
            <label htmlFor="password">Password:</label>
            <input name='password' type='password' id='password'  placeholder='Password' onChange={passwordHandler}/>
            <button onClick={()=>login()}>Login</button>
        </div>
        <i className='fa fa-long-arrow-left' onClick={backwards}></i>
        </>
    )
}