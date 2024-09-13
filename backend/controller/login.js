const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/UserModel');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const tokenData = {
      _id: user._id,
      name:user.name,
      email: user.email
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

      const options = {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      path:'/'
    };
    res.cookie("token" , token ,options).json({
      success: true,
      message: "Logged in successfully",
      token 
    });
    console.log(req.cookies);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login"
    });
  }
};


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const payload = {
            ...req.body,
            role:"General",
            password: hashPassword,
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(200).json({
            data: saveUser,
            success: true,
            message: "User created successfully",
        });

    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};


const usersController={
    login,
    signup,
}

module.exports=usersController;


