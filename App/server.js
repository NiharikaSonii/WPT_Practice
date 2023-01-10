const fs=require("fs");
const http=require("http");
var server=http.createServer(function(req,res){
    if(req.url==="/"){
        fs.readFile("index.html",function(err,data){
            if(err)
            console.log("error");
            res.write(data);
            res.end();
        });
    }
    else if(req.url==="/login"){
        fs.readFile("index.html",function(err,data){
            res.write(data);
            res.end();
        });
    }
    else if(req.url==="/dash"){
        fs.readFile("Dashboard.html",function(err,data){
            res.write(data);
            res.end();
        });
    }
    else if(req.url==="/registration"){
        fs.readFile("RegistrationForm.html",function(err,data){
            res.write(data);
            res.end();
        });
    }
    
});
server.listen(3000);
console.log("server is running");