const express = require("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(email);
  console.log(firstName);
  console.log(lastName);

  const data = {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName
        }
      }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us4.api.mailchimp.com/3.0/lists/3a6af5f28b";

  const options = {
    method: "POST",
    auth: "LukasSk:s360afec984cdf4f93ed160a307aab2dc-us4",
  }

    const request = https.request(url, options, function(response){

      let code = response.statusCode
      if (code === 200){
        res.sendFile (__dirname + "/success.html");
      } else{
          res.sendFile (__dirname + "/failure.html");

        };


    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })//)
  //install https, i dont think it was installed, its not in the list of dependencies unless its a native module
 request.write(jsonData);
 request.end();
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

app.get ("/",function(req, res){
  res.sendFile (__dirname + "/singup.html");
});




app.post ("/failure",function(req, res){
  res.redirect("/");
});
