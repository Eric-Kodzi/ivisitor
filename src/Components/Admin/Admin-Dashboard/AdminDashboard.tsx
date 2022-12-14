import './AdminDashboard.css';
import { BarChart, LineChart, DoughnutChart } from './Charts';
import { useState,useEffect } from 'react';



export const AdminDashboard:React.FC<{setheader:(prop:string)=>void}> = ({setheader}) => {

  const [bardata, setBardata] = useState({
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{
      label: 'visitors per month',
      data: [45,67,32,11,22,5,67,11,23,13,98,10],
      backgroundColor: ['cornflowerblue'],
    }]}
  )
  const [piedata, setPiedata] = useState({
    labels: ['HR','Finance','Marketing','Training','Security','IT'],
    datasets: [{
      label: 'visitors per department',
      data: [45,67,32,11,22,79],
      backgroundColor: ['chocolate','slateblue','green','crimson','violet','teal'],
    }]}
  )

  const [linedata, setLinedata] = useState({
    labels: ['Contractors','Regulators','Dipatchs','Personal Guests'],
    datasets: [{
      label: 'visits per category',
      data: [45,67,32,11],
      backgroundColor: ['cornflowerblue'],
    }]}
  )


   
  const [visitors, setVisitors] = useState([{name:'',host:'',image:'', signIn:'',type:''}]);

  const trows = visitors.map((user) => {
   return (
   <tr>
       <td>{user.name}</td>
       <td><img src={user.image} className='table_image'/></td>
       <td>{user.type}</td>
       <td>{user.host}</td>
       <td>{user.signIn}</td>
   </tr>
   )})

   useEffect(() => {
    setheader('Dashoard')
  },[])

  useEffect(() => {
    fetch('/api/visitorlists')
      .then((res) => res.json())
      .then((data) => {
        setVisitors(data.visitorlists)
        console.log(data)
      })
      .catch((err) => console.log(err));
  },[])

   return (
    <div className='admin-dashboard'>
      {/* <div className="header"><span>Dashboard</span></div> */}
      <div className='stats-one-container stats-one-container-width'>
          <div className='stats-one box-1'>
            <div className='stats-one-inner'>
              <span className='value1'>89</span>
              <span className='gray-text'>Visitors On Premises</span>
            </div>
            <i className='fa fa-bank'></i>
          </div>
          <div className='stats-one box-2'>
          <div className='stats-one-inner'>
              <span className='value2'>112</span>
              <span className='gray-text'>Signed out visitors</span>
            </div>
            <i className='fa fa-sign-out'></i>

          </div>
          <div className='stats-one box-3'>
           <div className='stats-one-inner'>
              <span className='value3'>267</span>
              <span className='gray-text'>Visitors this week</span>
            </div>
            <i className='fa fa-bar-chart'></i>
           </div>
          <div className='stats-one box-4'>
            <div className='stats-one-inner'>
              <span className='value4'>165</span>
              <span className='gray-text'>Visitors this month</span>
            </div>
            <i className='fa fa-line-chart'></i>
           </div>
         </div> 

      {/* <div className='stats-two-container'>
          <div className='stats-two-box'><span>Box 1</span></div>
          <div className='stats-two-box'><span>Box 2</span></div>
          <div className='stats-two-box'><span>Box 3</span></div>
          <div className='stats-two-box'><span>Box 4</span></div>
          
      </div>  */}
      <div>
        <div className='visitors-graph'>
          <div className='barchart chart'>
            <h4>Monthly Overview</h4>
            <BarChart chartdata={bardata} />
          </div>
          <div className='piechart chart'>
            <h4>Departmental Overview</h4>
            <DoughnutChart chartdata={piedata} />
          </div>
        </div>

      <div className='visitors-graph ' style={{marginBottom:'100px'}}>
      <div className='doughnutchart chart'>
          <h4>Visit-Categories Overview</h4>
          <LineChart chartdata={linedata} />
        </div>
        <div className='current-visitors'>
          <h4>Current Visitors</h4>
          <table className="styled-table" style={{marginTop:0}}>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Photo</td>
                    <td>Category</td>
                    <td>Host</td>
                    <td>Time In</td>
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>

        </table>
        </div>
        
      </div>
      </div>
    </div>
    
    
   )
}