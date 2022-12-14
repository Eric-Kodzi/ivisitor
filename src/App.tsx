
import './App.css';
import HomePage from './Components/Homepage/HomePage';
import Visitor from './Components/Visitor/Visitor';
import { Routes, Route } from "react-router-dom"
import VisitorAuth from './Components/VisitorAuthentication/VisitorAuthentication';
import { AdminLogin } from './Components/Admin/Admin-Login/AdminLogin';
import { EmployeeAuthentication } from './Components/Employee/Employee-Authentication/EmployeeAuthentication';


function App() {

  return (
    
      <div className="App">
      <Routes>
        <Route path="/ivisitor/visitor" element={ <Visitor/> } />
      </Routes>
      <Routes>
        <Route path="/ivisitor" element={ <HomePage/> } />
      </Routes>
      <Routes>
            <Route  path="/ivisitor/visitor/authentication" element={ <VisitorAuth/> }/>
      </Routes>
      <Routes>
            <Route  path="/ivisitor/admin" element={ <AdminLogin/> }/>
      </Routes>
      <Routes>
            <Route  path="/ivisitor/employee" element={ <EmployeeAuthentication/> }/>
      </Routes>
      </div>
  
  );
}

export default App;
