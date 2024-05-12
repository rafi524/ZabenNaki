const oracledb = require('oracledb');
const router = require('express').Router();

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "ors", password: "ors77", connectionString: "localhost/orcl" });

    console.log("Successfully connected to Oracle Database");

    connection.execute(
      `SELECT "Station_Name" FROM "Stations"
      `,
      [],  
     function(err, result) {
        if (err) {
          console.log(err.message);
          console.error(err.message);
          return; 
        }
        
       router.get('/sqlres',(req,res)=>{
          res.send(result);
          res.end();
          console.log("execute called!!!")
        })
        console.log(result);
     });

  } catch (err) {
    console.error(err);
  } finally {
    

    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
router.post('/vehicles',(req,res)=>{
console.log(req.body);
  res.render('TrainBook',(err,data)=>{
      if(err){
          console.log('Error',err);
          response.send('Something went wrong');
      }
      else{
          res.write(data);
          res.end();
      }
  });
})

module.exports= router;
run();