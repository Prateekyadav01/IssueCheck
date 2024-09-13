// helper/permission.js

const UserModel = require("../model/UserModel");

const uploadProductPermission = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user || user.role !== "ADMIN") {
            return false; 
        }
        return true; 
    } catch (error) {
        console.error('Error checking user permissions:', error);
        return false; 
    }
};

module.exports = uploadProductPermission;
