const User = require("../models/User");

module.exports.signup_get = (req, res)=>{
    console.log("SignUp Page Up");
}

module.exports.signup_post = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.create({ email, password });
      res.status(201).json(user);
    }
    catch(err) {
      console.log(err);
      res.status(400).send('error, user not created');
    }
   
  }