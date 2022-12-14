import aliGibran from './images/employeesImages/aliGibran.jpg';
import martinHecker from './images/employeesImages/martinHecker.jpg';
import dorisSarpong from './images/employeesImages/dorisSarpong.jpg';
import elenaSeyfert from './images/employeesImages/elenaSeyfert.jpg';
import emmanuelAsaber from './images/employeesImages/emmanuelAsaber.jpg';
import estherAmoah from './images/employeesImages/estherAmoah.jpg';
import georgeAmoasifynn from './images/employeesImages/georgeAmoasifynn.jpg';
import jerrySenyah from './images/employeesImages/jerrySenyah.jpg';
import katrinHecker from './images/employeesImages/katrinHecker.jpg';
import matthewDarkwa from './images/employeesImages/matthewDarkwa.jpg';
import salamiSuleiman from './images/employeesImages/salamiSuleiman.jpg';
import v1 from './images/visitorsImages/v1.jpg';
import v2 from './images/visitorsImages/v2.jpg';
import v3 from './images/visitorsImages/v3.jpg';
import v4 from './images/visitorsImages/v4.jpg';
import v5 from './images/visitorsImages/v5.jpg';
import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      employee: Model,
      visitorlist: Model,
      expectedVisitor: Model
    },

    

    seeds(server) {
        // Employees-List
      server.create("employee", { name:'Ali Gibran', position:'Director Of Strategy', email: 'aligibran@amalitech.org', password: '12345', photo: aliGibran, department:'Finance', phone:'+233 549968874'})
      server.create("employee", { name:'Martin Hecker', position:'CEO & Founder', email: 'erickodzi@gmail.com', password: '12345',photo: martinHecker, department:'HR', phone:'+233 549968874'})
      server.create("employee", { name:'Doris Sarpong', position:'Finance Analyst', email: 'dorissarpong@amalitech.org', password: '12345',photo:dorisSarpong, department:'Facility', phone:'+233 549968874'})
      server.create("employee", { name:'Elena Seyfert', position:'HR Generalist', email: 'elenaseyfert@amalitech.org', password: '12345',photo:elenaSeyfert, department:'Production', phone:'+233 549968874'})
      server.create("employee", { name:'Emmanuel Asaber', position:'Senior Software Trainer', email: 'emmanuelasaber@amalitech.org', password: '12345',photo:emmanuelAsaber, department:'HR', phone:'+233 549968874'})
      server.create("employee", { name:'Esther Amoah', position:'Digital Marketing Analyst', email: 'estheramoah@amalitech.org', password: '12345',photo:estherAmoah, department:'Security', phone:'+233 549968874'})
      server.create("employee", { name:'George Amoasifynn', position:'Facility Assistant', email: 'georgeamoasifynn@amalitech.org', password: '12345',photo:georgeAmoasifynn, department:'HR', phone:'+233 549968874'})
      server.create("employee", { name:'Jerry Senyah', position:'Client Service Manager', email: 'jerrysenyah@amalitech.org', password: '12345',photo:jerrySenyah, department:'Public Relations', phone:'+233 549968874'})
      server.create("employee", { name:'Katrin Hecker', position:'Marketing Manager', email: 'katrinhecker@amalitech.org', password: '12345',photo:katrinHecker, department:'HR', phone:'+233 549968874'})
      server.create("employee", { name:'Matthew Darkwa', position:'Director of Operations', email: 'matthewdarkwa@amalitech.org', password: '12345',photo:matthewDarkwa, department:'Marketing', phone:'+233 549968874'})
      server.create("employee", { name:'Salami Suleiman', position:'Head of Training', email: 'salamisuleiman@amalitech.org', password: '12345',photo:salamiSuleiman, department:'Training', phone:'+233 549968874'})
      
       //  Visitors-List
      server.create("visitorlist", {name:'John Doe',email:'johndoe@gmail.com',phone:'0556785556',host:'Martin Hecker',image: v1,date:'04-06-2022',signIn:'08:16',signOut:'09:30',type:'Guest'})
      server.create("visitorlist", {name:'Mary Ann',email:'maryann@gmail.com',phone:'0556785556',host:'Salami Suleiman',image: v2,date:'04-10-2022',signIn:'13:16',signOut:'',type:'Dispatch'})
      server.create("visitorlist", {name:'Bell Sebi',email:'bellsebi@gmail.com',phone:'0556785556',host:'Martin Hecker',image: v3,date:'04-06-2022',signIn:'08:16',signOut:'',type:'Regulator'})
      server.create("visitorlist", {name:'Jane Wood',email:'janewood@gmail.com',phone:'0556785556',host:'Salami Suleiman',image: v4,date:'04-06-2022',signIn:'08:45',signOut:'10:15',type:'Contractor'})
      server.create("visitorlist", {name:'Richard Gasu',email:'richardgasu@gmail.com',phone:'0556785556',host:'Martin Hecker',image: v5,date:'04-06-2022',signIn:'08:16',signOut:'',type:'Contractor'})

       // Expected-Visitors-List
      server.create("expectedVisitor", {firstname:'Ann',lastname:'Bell',email:'annbell@gmail.com',phone:'0267777289',host:'Salami Suleiman',type_of_visitor:'dispatch'})
      server.create("expectedVisitor", {firstname:'Fafali',lastname:'Ben',email:'fafaliben@gmail.com',phone:'0267777289',host:'Katrin Hecker',type_of_visitor:'dispatch'})
      server.create("expectedVisitor", {firstname:'Ben',lastname:'Doe',email:'bendoe@gmail.com',phone:'0267777289',host:'Salami Suleiman',type_of_visitor:'dispatch' })
    },

    routes() {
      this.namespace = "api"

      this.get("/visitorlists", (schema) => {
        return schema.visitorlists.all()
      })

      this.get("/employees", (schema) => {
        return schema.employees.all()
      })

      this.get("/expectedVisitors", (schema) => {
        return schema.expectedVisitors.all()
      })



      this.get("/employees/:id", (schema, request) => {
        let id = request.params.id
      
        return schema.employees.find(id)
      })

      this.post("/visitorlists", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

          return schema.visitorlists.create(attrs);
      })

      this.post("/employees", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

          schema.employees.create(attrs)
          return { status:'ok'}
      })

      this.post("/expectedVisitors", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

         schema.expectedVisitors.create(attrs)
           return { status:'Message successfully delivered.'}
      })
      
      this.patch('/visitorlists/:id', (schema, request) => { 
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let visitor = schema.visitorlists.find(id);
        visitor.update(newAttrs);
        return ({status: visitor.name + ',' + ' you have signed out successfully'})
      })

      
      this.passthrough((request) => {
        return request.url.includes("emailjs.com");
      })
     
      this.passthrough((request) => {
        return request.url.includes("localhost:3000");
      })

      
    
  },
})

  return server
}