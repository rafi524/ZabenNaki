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

module.exports = {
   
    createNewCustomer,
    createNewCompany,
    getUIDByEmail,
    getUIDByUserName
}