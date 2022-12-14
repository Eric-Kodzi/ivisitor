
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
        <Route path="/visitor" element={ <Visitor/> } />
      </Routes>
      <Routes>
        <Route path="" element={ <HomePage/> } />
      </Routes>
      <Routes>
            <Route  path="/visitor/authentication" element={ <VisitorAuth/> }/>
      </Routes>
      <Routes>
            <Route  path="/admin" element={ <AdminLogin/> }/>
      </Routes>
      <Routes>
            <Route  path="/employee" element={ <EmployeeAuthentication/> }/>
      </Routes>
      </div>
  
  );
}

export default App;
