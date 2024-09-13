const UserModel = require('../model/UserModel'); 
const AllUser = async (req, res) => {
  try {
    const users = await UserModel.find({});
    // console.log(users)
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
};

module.exports = AllUser;
