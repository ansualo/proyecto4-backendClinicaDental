const { User } = require('../models');

const { Op } = require('sequelize');

const userController = {};



// GET ALL NOS DEVUELVE LA INFORMACIÓN DE TODOS LOS PACIENTES O DENTISTAS, SEGÚN EL CASO.
// SI BUSCAMOS EN PARAMS POR EL NOMBRE O APELLIDO NOS DEVUELVE LA INFORMACIÓN DE ESE USUARIO ESPECÍFICO

userController.getAllPatients = async (req, res) => {
    try {

        // filter es un objeto vacio con dos propiedades, filtra solo por los pacientes y 
        // excluye el passport, role_id y collegiate_number, ya que este último solo afecta a los dentistas 
        const filter = {
            where: {
                role_id: 1
            },
            attributes: {
                exclude: ["password", "role_id", "collegiate_number"]
            },
        }
        // le añadimos a filter que, filtrando con op like, busque por nombre aunque solo escribamos una parte
        if (req.query.name) {
            filter.where.name = {
                [Op.like]: "%" + req.query.name + "%"
            }
        }
        // para poder filtrar en params tambien por el apeliido
        if (req.query.surname) {
            filter.where.surname = {
                [Op.like]: "%" + req.query.surname + "%"
            }
        }
        // si no hay nada en filter devolverá todos los pacientes
        const users = await User.findAll(
            filter
        )
        // si no hay pacientes con ese nombre:
        if (users.length == 0) {
            return res.status(404).json({
                succes: true,
                message: "No patients"
            })
        }
        return res.json({
            succes: true,
            message: "Patients retrieved",
            data: users
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Patients cannot be retrieved",
                error: error.message
            }
        )
    }
}

userController.getAllDentists = async (req, res) => {
    try {
        // filter es un objeto vacio con dos propiedades, filtra solo por los dentistas y excluye el passport y role_id
        const filter = {
            where: {
                role_id: 2
            },
            attributes:["id", "name", "surname", "collegiate_number"]
    
        }
        // le añadimos a filter que, filtrando con op like, busque por nombre aunque solo escribamos una parte
        if (req.query.name) {
            filter.where.name = {
                [Op.like]: "%" + req.query.name + "%"
            }
        }
        // para poder filtrar en params tambien por el apeliido
        if (req.query.surname) {
            filter.where.surname = {
                [Op.like]: "%" + req.query.surname + "%"
            }
        }
        // si no hay nada en filter devolverá todos los dentistas
        const users = await User.findAll(
            filter
        )
        // si no hay dentistas con ese nombre:
        if (users.length == 0) {
            return res.status(404).json({
                succes: true,
                message: "No dentists"
            })
        }
        return res.json({
            succes: true,
            message: "Dentists retrieved",
            data: users
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Dentists cannot be retrieved",
                error: error.message
            }
        )
    }
}

userController.getProfile = async (req, res)=> {

    try {
        const userId = req.userId;
        
        const profile = await User.findByPk(
            userId, 
            {
                attributes: {
                    exclude: ["id","password", "role_id", "createdAt", "updatedAt"]
                },
            }
        ); 

        return res.json(
            {
                success: true,
                message: "Profile retrieved",
                data: profile,
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Profile cannot be retrieved",
                error: error.message
            }
        )
    }

}

userController.updateProfile = async (req, res)=> {

    try {
        const userId = req.userId;
        const { email, phone, address } = req.body

        const profile = await User.update(
            {
                email: email, 
                phone: phone, 
                address: address,
            },
            {
                where: {
                    id: userId
                }
            }
        )
        const newProfile = await User.findByPk(
            userId, 
            {
                attributes: {
                    exclude: ["id", "password", "role_id", "collegiate_number", "createdAt", "updatedAt"]
                },
            }
        ); 
        return res.json(
            {
                success: true,
                message: "Profile updated",
                data: newProfile
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Profile cannot be updated",
                error: error.message
            }
        )
    }
}

userController.deleteProfile = async(req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.destroy({
            where: {
                id: userId
            }
        })
        
        return res.json(
            {
                success: true,
                message: "User deleted successfully",
                data: deletedUser
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cannot be deleted",
                error: error.message
            }
        )
    }
}



module.exports = userController