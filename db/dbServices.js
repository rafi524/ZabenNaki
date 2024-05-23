const database = require('./dbMain.js');

async function createNewCustomer(customer){
    const sql = `
Begin CREATE_CUSTOMER(:username,:name,:email,:phone,:password,:nid,:passport,:country,:city,:detail,:signupdate,:birthdate); end;
    `;
    const binds = {
        
        username: customer.username,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        password: customer.password,
        nid: customer.nid,
        passport: customer.passport,
        country: customer.country,
        city: customer.city,
        detail: customer.detail,
        signupdate:customer.signupdate,
        birthdate:customer.birthdate

    }
    console.log(customer);
    return await database.execute(sql, binds, {});
}
async function createNewCompany(company)
{
    const sql=
    `
 Begin CREATE_COMPANY(:username,:cname,:email,:phone,:password,:type,:signupdate); end;
`;
const binds={
    username: company.username,
    cname: company.cname,
    email: company.email,
    phone: company.phone,
    password: company.password,
    type: company.type,
    signupdate:company.signupdate
}
console.log("binds");        
console.log(binds);
    return await database.execute(sql, binds, {});
}
async function getUIDByEmail(email){
    const sql = `
        SELECT 
            ID, "User_Type","Password"
        FROM 
            "User"
        WHERE 
            "Email" = :email
        `;
    const binds = {
        email : email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function getUIDByUserName(username){
    const sql = `
        SELECT 
            ID, "User_Type","Password"
        FROM 
            "User"
        WHERE 
            "User_Name" = :username
        `;
    const binds = {
        username : username
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
/*
async function getRoute(from,to)
{
        console.log('bdSrv '+from+' '+to);
        let ID;
    const sql = `
    DECLARE 
       BEGIN
      :ID:=GET_ROUTE(:from,:to);
       END;
        `;
    const binds = {
       from:from,
       to:to,
       ID:ID 
    }
    await database.execute(sql, binds, database.options);
    return ID ;

   // return (await database.execute(sql, binds, database.options)).rows;
     
}
*/
async function getVehicles(from,to,Vtype){
    const sql = `

    SELECT "Vehicle_ID","Departure_Time","Arrival_Time","Fare"
    FROM "Travels_Through"
    WHERE "Route_ID"=GET_ROUTE(:st1,:st2) AND "Vehicle_ID" IN (
    SELECT "Vehicle_ID" FROM "Vehicles" WHERE "Vehicle_Type"=:Vtype
    )
`;
    const binds = {
       st1:from,
       st2:to,
       Vtype:Vtype
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getBusByID(vehicleID)
{

    const sql = `

    SELECT "Bus_Name",(SELECT "Company_Name" FROM "Company" WHERE ID=(SELECT "Company_ID" FROM "Bus" WHERE "Bus_ID"=:vehicleID )) AS CNAME,GET_DepStationName(:vehicleID,'Bus') AS DepStation,GET_DesStationName(:vehicleID,'Bus') AS DesStation
	FROM "Bus"
    WHERE "Bus_ID"=:vehicleID
`;
    const binds = {
       vehicleID:vehicleID
    }
        
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllSeatsByVID(vehicleID,vType){
    let sql;
    if(vType='Bus')
     sql=`SELECT * FROM "Bus_Seat"
     WHERE "Bus_ID"=:vehicleID`;
    else if(vType='Train')
     sql=`SELECT * FROM "Train_Seat"
     WHERE "Train_ID"=:vehicleID;`;
    else if(vType='Plane')
     sql=`SELECT * FROM "Plane_Seat"
     WHERE "Plane_ID"=:vehicleID;`;
     const binds = {
        vehicleID:vehicleID
     }
         
     return (await database.execute(sql, binds, database.options)).rows;

}
async function getBookedRooms(hotel_ID){
    
    
         
    return (await database.execute(sql, binds, database.options)).rows;

}
async function getBookedSeats(vehicleID){
   
     
         
    return (await database.execute(sql, binds, database.options)).rows;

}
module.exports = {
   
    getVehicles,
    getBusByID,
    getAllSeatsByVID,
    getBookedSeats,
    getBookedRooms,
}