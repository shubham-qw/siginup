const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
// const client = require("@mailchimp/mailchimp_marketing");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const url = "https://us11.api.mailchimp.com/3.0/lists/9d7061fc6e";
const  options = {
    method : "POST",
    auth : "shubham69:46d6ee12250ca73c3dc7caa221dc7a3f-us11"
}


app.post("/", function(req,res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.e_mail;
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);

    const request = https.request(url,options,function(response){
        
        response.on("data", function(data) {
            data = JSON.parse(data);
            console.log(data); 
            const errorCount = data.error_count;
            if (errorCount) {
                res.sendFile(__dirname+"/failure.html");
            }
            else {
                res.sendFile(__dirname+"/success.html");
            }
        });
    });

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req,res) {
    res.redirect("/");
})

app.get("/", function (req,res) {
    res.sendFile(__dirname+"/signup.html");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000");
})

// 46d6ee12250ca73c3dc7caa221dc7a3f-us11
// 9d7061fc6e

// client.setConfig({
//     apiKey: "46d6ee12250ca73c3dc7caa221dc7a3f",
//     server: "us11"
//   });

//   const run = async () => {
//     const response = await client.lists.batchListMembers("9d7061fc6e", {
//       members: [ {
//         email_address : email,
//         status : "subscribed",
//         merge_fields : {
//             FNAME : firstName,
//             LNAME : lastName
//         }
//     }],
//     });
//   };
// run();

