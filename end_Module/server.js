const mysql=require("mysql");
const express=require("express");
const path=require("path");
const bodyparser=require("body-parser");
const { table } = require("console");
const app=express();
app.use(bodyparser.urlencoded({extended:false}));

var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root12345",
    port: 3306,
    database: "DB"
});
con.connect(function(err){
    if(err) throw err;
    console.log("db connected");
});
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"player.html"));
});
app.post("/niha",function(req,res){
    var name=req.body.name;
    var q="select * from player where name = '"+name+"'";
    con.query(q,function(err,result){
        if(err)
        console.log(err);
        else{
            var data1="<table>";
            for(var i=0;i<result.length;i++){
                data1 += "<tr><td>"+result[i].player_id+"</td><td>"+result[i].name+"</td><td>"+result[i].city+"</td><td>"+ result[i].DOB+"</td></tr>";
                
            }
            data1+="</table>";
            res.send(data1);
        }
    })
})

app.get("/ajay",function(req,res){
   var ques="select * from player";

   var data = "<table border=1px>";

   con.query(ques,function(err,result){
    if(err)
      console.log(err);
    else {
      console.log(result);
      for(var i=0; i<result.length; i++){
        data += "<tr><td>"+result[i].player_id+"</td><td>"+result[i].name+"</td><td>"+result[i].city+"</td><td>"+ result[i].DOB+"</td></tr>";
      }
      data+="</table>";
        res.send(data);
    }
   })

})

app.listen(3000);
console.log("port no:3000");

