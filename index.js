
const express=require('express');
const fs=require('fs');
const sqlRouter=require('./main');
const app=express();
const morgan=require('morgan');
const { format } = require('path');

//import routes
const authRoutes= require('./routes/authenRoute.js');
const searchRoutes=require('./routes/searchRoute.js');
app.set('view engine','ejs');
app.set('views','views');
// middleWare Array
const middleWare=[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
     express.json()

]

app.use(middleWare);
app.use('/auth',authRoutes);
app.use('/result',searchRoutes);
app.get('/',(req,res)=>{
    res.render('pages/home.ejs',{Title:'ZabenNaki',Logged: false});
   console.log(req.body );
});
app.post('/',(req,res)=>{
    console.log(req.body);
    res.render('pages/home.ejs',{Title:'ZabenNaki',Logged: true});        

})
app.get('/bus',(req,res)=>{
    console.log(req.body);
   let buses=[];
   let bus1={
    cname:"Hanif Enterprize",
    name:"Hino-84/2 A",
    depTime:"7.00 AM",
    arrTime: "6.00 PM",
    from:"Dhaka",
    to:"Khulna",
    fare: "500 BDT"
    
   }
   let bus2={
    cname:"Ena Enterprise",
    name:"Hino-81/2 A",
    depTime:"8.00 AM",
    arrTime: "4.00 PM",
    from:"Dhaka",
    to:"Khulna",
    fare: "400 BDT"
    
   }
   buses.push(bus1);
   buses.push(bus2);
    res.render('pages/buslist',{Title:"Buses Available",Logged:true,buses});
})
const PORT=4000;
app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
});