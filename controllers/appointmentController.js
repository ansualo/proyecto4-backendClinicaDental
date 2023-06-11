const { Appointment, User, Treatment } = require('../models');

const appointmentController = {};


appointmentController.getAllAppointments = async (req, res) => {
    try {

        const appointments = await Appointment.findAll(
            {
                attributes: ["id", "date"],
                include: [
                    {
                        model: Treatment,
                        attributes: ["name", "price"]
                    },
                    {
                        model: User,
                        as: "doctor",
                        attributes: ["name", "surname", "collegiate_number"]
                    }
                ]
            },
        );
        return res.json({
            succes: true,
            message: "Appointments retrieved succesfully",
            data: appointments
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointments cannot be retrieved",
                error: error.message
            }
        )
    }
}

appointmentController.getOneAppointment = async (req, res) => {
    try {
        const patientId = req.userId
        const appointmentId = req.params.id

        let appointment = await Appointment.findByPk(appointmentId)
        
        // comprobamos que la cita pertenece al paciente
        if (appointment.user_id_1 !== patientId) {
            return res.json(
                {
                    success: true,
                    message: "Incorrect appointment"
                }
            )
        }

        appointment = await Appointment.findByPk(
            appointmentId,
            {
                attributes: ["id", "date"],
                include: [
                    {
                        model: Treatment,
                        attributes: ["name", "price"]
                    },
                    {
                        model: User,
                        as: "doctor",
                        attributes: ["name", "surname", "collegiate_number"]
                    }
                ]
            },
        );


        return res.json({
            succes: true,
            message: "Appointment retrieved succesfully",
            data: appointment
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cannot be retrieved",
                error: error.message
            }
        )
    }
}

appointmentController.getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll(
            {
                where: {
                    user_id_1: req.userId
                },
                attributes: ["id", "date"],
                include: [
                    {
                        model: Treatment,
                        attributes: ["name", "price"]
                    },
                    {
                        model: User,
                        as: "doctor",
                        attributes: ["name", "surname", "collegiate_number"]
                    }
                ]
            },
        );

        if (appointments.length == 0) {
            return res.status(404).json({
                succes: true,
                message: "No appointments have been made yet"
            })
        }

        return res.json(
            {
                success: true,
                message: "Appointments retrieved succesfully",
                data: appointments
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointments cannot the retrieved",
                error: error.message
            }
        )
    }
}

appointmentController.getDoctorAppointments = async (req, res) => {
    try {

        const appointments = await Appointment.findAll(
            {
                where: {
                    user_id_2: req.userId
                },
                attributes: ["id", "date"],
                include: [
                    {
                        model: Treatment,
                        attributes: ["name", "price"]
                    },
                    {
                        model: User,
                        as: "patient",
                        attributes: ["name", "surname", "phone"]
                    }
                ]
            }
        );

        return res.json(
            {
                success: true,
                message: "Appointments retrieved",
                data: appointments
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointments cannot the retrieved",
                error: error.message
            }
        )
    }
}



appointmentController.createAppointment = async (req, res) => {
    try {

        const patient = req.userId
        const { user_id_2, treatment_id, date } = req.body
        let appointment;

        // buscamos el dentista en la base de datos
        const dentist = await User.findByPk(user_id_2);

        //comprobamos que el rol es el de dentista
        if (dentist.role_id !== 2) {
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
                date: date ,
            },
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
        if (appointment.user_id_1 !== patientId) {
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
        if (dentist.role_id !== 2) {
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
                attributes: ["id", "date"],
                include: [
                {
                    model: Treatment,
                    attributes: ["name", "price"]
                },
                {
                    model: User,
                    as: "doctor",
                    attributes: ["name", "surname", "collegiate_number"]
                }
            ]
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

appointmentController.deleteAppointment = async (req, res) => {
    try {

        const patientId = req.userId
        const appointmentId = req.params.id

        // buscamos la cita en la base de datos
        const appointment = await Appointment.findByPk(appointmentId)

        // comprobamos que la cita pertenece al paciente
        if (appointment.user_id_1 !== patientId) {
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