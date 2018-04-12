const express = require('express')
var sqlite = require('sqlite-sync');

const app = express()

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


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


app.get('/', (req, res) => res.send('Hello World!!'));

app.get('/winter', function (req, res) {

   
    var x = GetData1();
    console.log("After");

    res.send(JSON.stringify(x) );
    
  });

app.get('/summer', function (req, res) {
    res.send(JSON.stringify({"msg": 1}));
  });

  

app.listen(server_port,server_ip_address, () => console.log('Example app listening on port '+ server_port+ ' ip ' + server_ip_address));