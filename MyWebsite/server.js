const mysql=require("mysql");
const express=require("express");
const path = require("path");
const app=express();
var bodyparser=require("body-parser");
//this line will separate parts of url and gives the 
//data in query object
//extended:false will use querystring module to parse the data
app.use(bodyparser.urlencoded({extended:false}));


var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    password:"root12345",
   database:"mydatabase" 
});
con.connect(function(err){
    if(err) throw err;
    console.log("connected");
    
});

//  con.query("create database mydatabase",function(err,result){
//      if(err) throw err;
//      else 
//      console.log(result);
//  });

//  con.query("create table MyTable (id int primary key, name varchar(20),address varchar(20))",function(err,result){
//      if(err) throw err;
//      else 
//      console.log(result);
// });

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "Home.html"));
});

app.post("/regis" , function(req, res) {
    var id = req.body.id;
    var nm = req.body.nm;
    var add = req.body.add;
    var ps = req.body.ps;
    var q = "insert into mytable values ("+id+" , '"+nm+"' , '"+add+"', '"+ps+"')";

    con.query(q, function(err, result){
        if(err){
        console.log(err);
        }
        else {
        console.log(result);
        }
    })
    if(status == "true") {
        res.send("successfully updated")
    }
    else {
        res.send("failed")
    }
})

app.get("/logpage", (req, res)=> {
     res.sendFile(path.join(__dirname, "Login.html"));
})

app.get("/RegistrationForm", (req, res)=> {
    res.sendFile(path.join(__dirname, "RegistrationForm.html"));
})

app.post("/login", function(req, res) {

    var un = req.body.uname;
    var pass = req.body.pass;
    var valid;

    var q = "select name from mytable where password ="+"'"+pass+"'"; 

    con.query(q, function(err, result){
        if(err)
        throw err;
        else{
            if(result.length > 0) {
            var row = result[0];
            valid = row.name;
            console.log(valid);
            if(un === valid){
            res.sendFile(path.join(__dirname, "RegistrationForm.html"));
            }
            else{
                res.sendFile(path.join(__dirname, "errorpage.html"));
            }
            }
            else {
                res.sendFile(path.join(__dirname, "errorpage.html"));
            }
        }
        })
    //console.log(valid);
});



app.post("/page", (req, res) => {
    var name =req.body.name;
    var add = req.body.address;
     var q = "insert into myTable values (7, '"+name+"', '"+add+"')";
    con.query(q, function(err, result) {
         if(err){
             console.log(err);
         }
         else
         console.log(result);
    });
    res.status(200).sendFile(path.join(__dirname, "page.html"));
 })

app.listen(7070);
console.log("port:7070");
// con.query("create database mydatabase",function(err,result){
//     if(err) throw err;
//     else 
//     console.log(result);
// } )
// con.query("show databases",function(err,result){
//     if(err) throw err;
//     else 
//     console.log(result);
// } )

//  con.query("insert into myTable (id,name,address) values (3,'pratiksha','mumbai')",function(err,result){
//      if(err) throw err;
//      else 
//      console.log(result);
//  } )
// con.query("select * from myTable",function(err,result){
//     if(err) throw err;
//     else 
//     console.log(result);
// } )
