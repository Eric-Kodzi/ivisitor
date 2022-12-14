import { useState } from "react";
import { LogInPage } from "../../LogIn-Page/LogInPage";
import { AdminPage } from "../Admin-Page/AdminPage";

export function AdminLogin() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [ admin, setAdmin] = useState(false)
    

    const usernameHandler = (event:any) => setUsername(event.target.value);
    const passwordHandler = (event:any) => setPassword(event.target.value);
    
  const login = () => {
    if (password === '12345' && username === 'admin'){
        setAdmin(true)
    }
  }




    return (
        <div>
            { 
            admin ? 
            <AdminPage/> : 
            <LogInPage 
             usernameHandler={usernameHandler}
             passwordHandler={passwordHandler}
             login={login}
            /> 
            }
        </div>
    )
}

