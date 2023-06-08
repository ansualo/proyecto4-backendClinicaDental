const { User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = {};


authController.register = async (req, res) => {
    try {
        if (req.body.password.length < 4){
            return res.send('Password must be longer than 4 characters');
        }

        const newPassword = bcrypt.hashSync(req.body.password, 8);

        const newUser = await User.create(
            {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: newPassword,
                phone: req.body.phone,
                address: req.body.address,
                date_of_birth: req.body.date_of_birth,
                role_id: 1,
            }
        );
        return res.json(
            {
                success: true,
                message: "User created successfully",
                data: newUser
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cannot be created",
                error: error.message
            }
        );
    }
}

authController.login = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne(
            {
                where: {
                    email: email
                }
            }
        );
        if(!user) {
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
        };

        const isMatch = bcrypt.compareSync(password, user.password);

        if(!isMatch) {
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
        };

        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                roleId: user.role_id,
            },
            'secreto',
            {
                expiresIn: '3h'
            }
        );

        return res.json(
            {
                success: true,
                message: "User logged",
                token: token
            }
        );

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cannot be logged",
                error: error
            }
        )
    }
}



module.exports = authController;