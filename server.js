const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


// UserDB = URL OF DB

mongoose.connect(UserDB, {useNewUrlParser: true, useUnifiedTopology: true});


app.get("/", (req, res)=>{
    console.log("HomePage Up");
})


app.post("/signup-post", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.create({ email, password });
      res.status(201).json(user);
    }
    catch(err) {
      console.log(err);
      res.status(400).send('error, user not created');
    }
   
  })
  
//   app.post("/login-post", async (req, res) => {
//     const { email, password } = req.body;
  
//     console.log(email, password);
//   }
// )


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started");
});
