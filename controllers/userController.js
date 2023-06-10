const { User} = require('../models');

const { Op } = require('sequelize');

const userController = {};



// NOS DEVUELVE LA INFORMACIÓN DE TODOS LOS PACIENTES 
// SI BUSCAMOS EN PARAMS POR EL NOMBRE O APELLIDO NOS DEVUELVE LA INFORMACIÓN DE ESE PACIENTE ESPECÍFICO

userController.getAllPatients = async (req, res) => {
    try {

        // filter es un objeto vacio con dos propiedades, filtra solo por los pacientes y excluye el passport y role_id
        const filter = {
            where: {
                role_id: 1
            },
            attributes: {
                exclude: ["password", "role_id"]
            },
        }
        // le añadimos a filter que, filtrando con op like, busque por nombre aunque solo escribamos una parte
        if(req.query.name){
            filter.where.name = {
                [Op.like]: "%" + req.query.name + "%" 
            }
        }
        // para poder filtrar en params tambien por el apeliido
        if(req.query.surname){
            filter.where.surname = {
                [Op.like]: "%" + req.query.surname + "%" 
            }
        }
        // si no hay nada en filter devolverá todos los pacientes
        const users = await User.findAll(
            filter
        )
        // si no hay pacientes con ese nombre:
        if(users.length == 0) {
            return res.status(404).json({
                succes: true, 
                message: "No users"
            })
        }
        return res.json({
            succes: true, 
            message: "Users retrieved",
            data: users
        })
  
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Users cannot be retrieved",
                error: error.message
            }
        )
    }
}



module.exports = userController