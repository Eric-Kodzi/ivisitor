import './HomePage.css';
import { Link } from 'react-router-dom';
import  admin  from './admin.png';
import visitor from './visitor.png';
import employee from './employee.png';
import logo from './logo.png';



export default function HomePage() {
    return (
        
            <div className="homepage">
                <div className='homepage-logo-box'>
                    <img className='homepage-logo' src={logo} alt="logo" />
                </div>
                <div className='module-selectors-container'>
                    <Link to='/ivisitor/visitor'>
                        <div>
                        <div className='module-selector'><img src={visitor} /></div>
                        </div>
                    </Link>
                    <Link to='/ivisitor/employee'>
                       <div className='module-selector'>
                       <img src={employee} />
                       </div>
                    </Link>
                    <Link to='/ivisitor/admin'>
                        <div className='module-selector'>
                            <img src={admin} />
                        </div>
                    </Link>
                </div>
               
            </div>
       
    )
}