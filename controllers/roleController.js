const { Role } = require('../models');

const roleController = {};


roleController.getAllRoles = async (req, res) => {

    try{
        const users = await Role.findAll();
        return res.json(
        {
            success: true,
            message: "All users retrieved",
            data: users
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Users cannot be retrieved",
                error: error.message
            }
        );
    }
}

roleController.createRole = async (req, res) => {

    try{
        let body = req.body;

        const newUser = await Role.create(
            {
                name: body.name
            }
        );
        return res.json(
            {
                success: true,
                message: "New user created",
                data: newUser
            }
        );
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cannot be created",
                error: error.message
            }
        );
    }
}

roleController.updateRole = async (req, res) => {
    try{
        const userId = req.params.id;
        const name = req.body.name;

        const updatedUser = await Role.update(
            {
                name: name
            },
            {
                where: {
                    id: userId
                }
            }
        );
        return res.json(
            {
                success: true,
                message: "User updated successfully",
                data: updatedUser
            }
        );
    }
    catch (error){
        return res.status(500).json(
            {
                success: false,
                message: "User cannot be updated",
                error: error.message
            }
        );
    }
}

roleController.deleteRole = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await Role.destroy(
            {
                where: {
                    id: userId
                }
            }
        );
        return res.json(
            {
                success: true,
                message: "Role deleted successfully",
                data: deletedUser
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Role cannot be deleted",
                error: error.message
            }
        );
    }
}

module.exports = roleController;