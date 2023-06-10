const { Appointment, User } = require('../models')

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








module.exports = appointmentController