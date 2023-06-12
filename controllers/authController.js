const { User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = {};


authController.register = async (req, res) => {
    try {

        const { name, surname, email, password,  phone, address, date_of_birth} =  req.body;

        // Esta expresión regular garantiza que la contraseña cumpla con los siguientes requisitos:
        // Al menos una letra mayúscula.
        // Al menos una letra minúscula.
        // Al menos un número.
        // Al menos un carácter especial (@, $, !, %, *, ?, &).
        // Longitud entre 8 y 14 caracteres. 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
        const isValidPassword = passwordRegex.test(password)
        if (!isValidPassword) {
            return res.json({
                success: true,
                message: "Not a valid password"
            })
        }

        // encriptamos la contraseña
        const newPassword = bcrypt.hashSync(password, 8);

        // comprueba que los campos no sean null o sean una string vacía 
        if (!name || !surname || !email || !password || !phone || !address || !date_of_birth || 
            name.trim() === '' || surname.trim() === '' || email.trim() === '' || password.trim() === '' || 
            phone.trim() === '' || address.trim() === '' || date_of_birth.trim() === ''){

            return res.json({
                success: true,
                message: "All fields must be completed"
            })
        }

        const newUser = await User.create(
            {
                name: name,
                surname: surname,
                email: email,
                password: newPassword,
                phone: phone,
                address: address,
                date_of_birth: date_of_birth,
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

        // comprobamos que existe el usuario
        if(!user) {
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
        };

        // comprobamos si la contraseña es correcta
        const isMatch = bcrypt.compareSync(password, user.password);

        if(!isMatch) {
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
        };

        // creammos el token 
        const token = jwt.sign(
            { 
                userId: user.id,
                roleId: user.role_id,
            },
            'secret',
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