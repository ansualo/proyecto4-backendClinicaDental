const { Appointment, User } = require('../models');
const appointment = require('../models/appointment');

const appointmentController = {};


appointmentController.createAppointment = async (req, res) => {
    try {

        const patient = req.userId
        const { user_id_2, treatment_id, date } = req.body
        let appointment;

        // buscamos el dentista en la base de datos
        const dentist = await User.findByPk(user_id_2);

        //comprobamos que el rol es el de dentista
        if(dentist.role_id !== 2){ 
            return res.json(
                {
                    success: true,
                    message: "Incorrect doctor",
                }
            )
        };
        appointment = await Appointment.create(
            {
                user_id_1: patient,
                user_id_2: user_id_2,
                treatment_id: treatment_id,
                date: date,
            }
        )
        return res.json(
            {
                success: true,
                message: "Appointment created successfully",
                data: appointment
            }
        )
      
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cannot be created",
                error: error.message
            }
        )
    }
}

appointmentController.updateAppointment = async (req, res) => {
    try {

        const patientId = req.userId
        const appointmentId = req.params.id
        const { user_id_2, treatment_id, date } = req.body

        // buscamos la cita en la base de datos
        const appointment = await Appointment.findByPk(appointmentId)

        // comprobamos que la cita pertenece al paciente
        if (appointment.user_id_1 !== patientId){
            return res.json(
                {
                    success: true,
                    message: "Incorrect appointment"
                }
            )
        }

        // buscamos el dentista en la base de datos
        const dentist = await User.findByPk(user_id_2);

        //comprobamos que el rol es el de dentista
        if(dentist.role_id !== 2){ 
            return res.json(
                {
                    success: true,
                    message: "Incorrect doctor",
                }
            )
        };

        updatedAppointment = await Appointment.update(
            {
                user_id_2: user_id_2,
                treatment_id: treatment_id,
                date: date,
            },
            {
                where: {
                    id: appointmentId
                }
            }
        )
        const newAppointment = await Appointment.findByPk(
            appointmentId,
            {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            }
        );

        return res.json(
            {
                success: true,
                message: "Appointment updated successfully",
                data: newAppointment
            }
        )
      
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cannot be updated",
                error: error.message
            }
        )
    }
}

appointmentController.deleteAppointment = async(req, res) => {
    try {

        const patientId = req.userId
        const appointmentId = req.params.id

        // buscamos la cita en la base de datos
        const appointment = await Appointment.findByPk(appointmentId)

        // comprobamos que la cita pertenece al paciente
        if (appointment.user_id_1 !== patientId){
            return res.json(
                {
                    success: true,
                    message: "Incorrect appointment"
                }
            )
        }

        const deletedAppointment = await Appointment.destroy({
            where: {
                id: appointmentId
            }
        })
        
        return res.json(
            {
                success: true,
                message: "Appointment deleted successfully",
                data: deletedAppointment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cannot be deleted",
                error: error.message
            }
        )
    }
}





module.exports = appointmentController