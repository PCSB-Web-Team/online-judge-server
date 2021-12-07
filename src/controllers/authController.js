const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


module.exports.login_get = (req, res)=>{
    console.log("Login Page Up");
}

module.exports.login_post = async (req, res) =>{
    const email = req.body.email;
    const textPassword = req.body.password;

    const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(textPassword, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
}

module.exports.signup_get = (req, res)=>{
    console.log("SignUp Page Up");
}

module.exports.signup_post = async (req, res) => {
    const email = req.body.email;
    const textPassword = req.body.password;

    if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!textPassword || typeof textPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (textPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

    const password = await bcrypt.hash(textPassword, 10);
    try {
      const user = await User.create({ email, password });
      console.log('User created successfully: ', user)
    }
    catch(err) {
        if (err.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw err
    }
   
  }