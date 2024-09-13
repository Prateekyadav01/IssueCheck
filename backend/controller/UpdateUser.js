const User = require('../model/UserModel'); // Import your User model

const updateUser = async (req, res) => {
    const { _id, email, name, role } = req.body; 

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id, 
            { _id,email, name, role }, 
            { new: true, runValidators: true } 
        );

        // console.log(updatedUser)
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

module.exports = updateUser;
