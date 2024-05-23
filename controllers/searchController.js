const dbAuth = require('../db/dbAuth.js')
exports.searchBusGetController = (req, res, next) => {
    res.render('pages/buslist', { Title: 'ZabenNaki', Logged: false, errors: [] });
}
exports.searchBusPostController = (req, res, next) => {
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
    
}