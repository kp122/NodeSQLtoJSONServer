const express = require('express')
var sqlite = require('sqlite-sync');

const app = express()


function GetData1()
{
  console.log("Before");
  sqlite.connect('test.db');
  var rows = sqlite.run("SELECT * FROM user");
  console.log(rows);
  console.log("Rows Ended");
  sqlite.close();

  return rows;
}


// Add headers
app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

         
    
        // Pass to next layer of middleware
        next();
    });


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/winter', function (req, res) {

   
    var x = GetData1();
    console.log("After");

    res.send(JSON.stringify(x) );
    //res.send(JSON.stringify({"name": "y"}));
  });

app.get('/summer', function (req, res) {
    res.send(JSON.stringify({"msg": 1}));
  });

app.listen(3000, () => console.log('Example app listening on port 3000!'));