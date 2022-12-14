import { useState } from "react";
import { LogInPage } from "../../LogIn-Page/LogInPage";
import { EmployeeHome } from "../Employee-Home/EmployeeHome";


export function EmployeeAuthentication() {
    
    
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState({name:'',photo:'',position:'',email:''});
   

   

    const usernameHandler = (event:any) => setUsername(event.target.value);
    const passwordHandler = (event:any) => setPassword(event.target.value);



    const getUser = () => {
        fetch(`/api/employees/?email=${username}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data.employees.find((user:any)=> user.email === username))
            console.log(data)
          })
          .catch((err) => console.log(err));
    }
 


    return (
        <div>
            { user.name && password?
            <EmployeeHome user={user} /> : 
            <LogInPage 
             usernameHandler={usernameHandler}
             passwordHandler={passwordHandler}
             login={getUser}
            /> 
            }
        </div>
    )
}
