const bcrypt = require('bcrypt');
const dbAuth = require('../db/dbAuth.js')
exports.signupGetController = (req, res, next) => {
    res.render('pages/authen/signup', { Title: 'ZabenNaki', Logged: false, errors: [] });
}
exports.signupPostController = async (req, res, next) => {
   
    let results, errors = [];
    console.log(errors);
    if(req.body.username.length<2)
    errors.push('User Name must be at least two characteras');
    if(req.body.email.length<2)
    errors.push('Invalid Email');
    results = await dbAuth.getUIDByEmail(req.body.email);
    if (results.length > 0)
          errors.push('Email is already registered to a user');


    results = await dbAuth.getUIDByUserName(req.body.username);
   if (results.length > 0)
      errors.push('This User Name is used. Try another');

    // check if password confimation is right
    if (req.body.password !== req.body.cpassword)
        errors.push('Password confirmation doesn\'t match with password');

    // check if password has at least 6 char
    if (req.body.password.length < 6) {
        errors.push('Password must be at least 6 characters') ;
    }
    if (req.body.name.length ==0) {
        errors.push('Please Enter your name') ;
    }
    if (!req.body.birthdate) {
        errors.push('Please Enter your birthdate') ;
    }
   
    // if there are errors, redirect to sign up but with form informations
    if (errors.length > 0) {
        console.log(errors);
        res.render('pages/authen/signup.ejs', {
            Title: 'Error',
            Logged: false,
            errors: errors
        });
    }

    else {

        let hashPassword;
        let password = req.body.password;
        try {
            hashPassword = await bcrypt.hash(password, 11);
            console.log(hashPassword + ' hashed ');
        } catch (error) {
            console.log('Hashing error : ' + error)
        }

        let customer =
        {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPassword,
            nid: req.body.nid,
            passport: req.body.passport,
            country: req.body.country,
            city: req.body.city,
            detail: req.body.detail,
            signupdate: new Date(),
            birthdate: new Date()
        }

        dbAuth.createNewCustomer(customer);
        res.render('pages/authen/signup', { Title: 'ZabenNaki', Logged: false, errors });
    }

   
}

exports.signupcompanyGetController = (req, res, next) => {

    res.render('pages/authen/signupcompany', { Title: 'ZabenNaki', Logged: false,errors:[] });
}
exports.signupcompanyPostController = async (req, res, next) => {
    console.log('req body!!');
    console.log(req.body);
    
    let results, errors = [];
   
    if(req.body.username.length<2)
    errors.push('User Name must be at least two characteras');
    if(req.body.email.length<2)
    errors.push('Invalid Email');
    results = await dbAuth.getUIDByEmail(req.body.email);
    if (results.length > 0)
          errors.push('Email is already registered to a user');


    results = await dbAuth.getUIDByUserName(req.body.username);
   if (results.length > 0)
      errors.push('This User Name is used. Try another');

    // check if password confimation is right
    if (req.body.password !== req.body.cpassword)
        errors.push('Password confirmation doesn\'t match with password');

    // check if password has at least 6 char
    if (req.body.password.length < 6) {
        errors.push('Password must be at least 6 characters') ;
    }
    if (req.body.cname.length ==0) {
        errors.push('Please Enter your name') ;
    }
    
    // if there are errors, redirect to sign up but with form informations
    if (errors.length > 0) {
        console.log(errors);
        res.render('pages/authen/signupcompany', { Title: 'ZabenNaki', Logged: false,errors });
    }

    else {

        let hashPassword;
        let password = req.body.password;
        try {
            hashPassword = await bcrypt.hash(password, 11);
            console.log(hashPassword + ' hashed ');
        } catch (error) {
            console.log('Hashing error : ' + error)
        }

    let company =
    {
        username: req.body.username,
        cname: req.body.cname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword,
        type: req.body.type,
        signupdate: new Date()

    }

    dbAuth.createNewCompany(company);
    res.render('pages/authen/signupcompany', { Title: 'ZabenNaki', Logged: false,errors });
}
}
exports.signinGetController= (req, res, next) => {
    res.render('pages/authen/signin', { Title: 'ZabenNaki', Logged: false,errors:[] });
}
exports.signinPostController = async (req, res, next) => {
    console.log(req.body);
   let  errors = [];
   let reqPassword=req.body.password;
   
   let results1 = await dbAuth.getUIDByEmail(req.body.usernameoremail);
   let results2 = await dbAuth.getUIDByUserName(req.body.usernameoremail);
   



    if(results1.length > 0||results2.length > 0){
        
            if(results1.length==0)
            results1=results2;
           let match= await bcrypt.compare(reqPassword,results1[0].Password);
           
         console.log(match);
            if(!match)
            {
                errors.push('Incorrect password');
               
             res.render('pages/authen/signin',{Title:'ZabenNaki',Logged: false,errors});
            }
           else
           {
            res.render('pages/home',{Title:'ZabenNaki',Logged: true,errors});
           }
   
    }
    else
    {
        errors.push('Incorrect Credentials');
        res.render('pages/authen/signin',{Title:'ZabenNaki',Logged: false,errors});

    }
   
}

exports.logoutController = (req, res, next) => {

}