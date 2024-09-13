const UserModel = require("../model/UserModel");

const UserDetail = async (req, res) => {
    try {
        // Extract the user ID from the request object
        const userId = req.user;
              console.log(userId)
        // Check if the user ID is present
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is missing from the request",
            });
        }

        // Fetch the user details, excluding the password
        const user = await UserModel.findById(userId).select('-password');

        // If user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Send the user details in the response
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });

    } catch (e) {
        console.error("Error fetching user details:", e.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user details",
        });
    }
};

module.exports = UserDetail;
