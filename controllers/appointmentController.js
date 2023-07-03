const { Appointment, User, Treatment } = require('../models');
const { Op } = require('sequelize');
const appointmentController = {};


appointmentController.getAllAppointments = async (req, res) => {
    try {

        const appointments = await Appointment.findAll(
            {
                attributes: ["id", "date", "price"],
                include: [
                    {
                        model: User,
                        as: "patient",
                        attributes: ["id", "name", "surname"]
                    },
                    {
                        model: Treatment,
                        attributes: ["name"]
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
                attributes: ["id", "date", "price"],
                include: [
                    {
                        model: Treatment,
                        attributes: ["name"]
                    },
                    {
                        model: User,
                        as: "doctor",
                        attributes: ["name", "surname", "collegiate_number"]
                    }
                ]
            },
        );

        const user = await User.findByPk(
            req.userId,
            {
                attributes: ["name", "surname", "email", "phone", "address", "date_of_birth"],
            })

        return res.json({
            succes: true,
            message: "Appointment retrieved succesfully",
            user: user,
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

appointmentController.getAppointmentByName = async (req, res) => {

    try {

        const patientName = req.query.name

        const patient = await User.findOne(
            {
                where: { name: patientName },
                attributes: ["id"],
            }
        );

        const patientId = patient.id

        const appointments = await Appointment.findAll(
            {
                where: {
                    user_id_1: patientId
                },
                attributes: ["id", "date", "price"],
                include: [
                    {
                        model: User,
                        as: "patient",
                        attributes: ["id", "name", "surname"]
                    },
                    {
                        model: Treatment,
                        attributes: ["name"]
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

appointmentController.getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll(
            {
                where: {
                    user_id_1: req.userId
                },
                attributes: ["id", "date", "price"],
                include: [
                    {
                        model: Treatment,
                        attributes: ["name"]
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

        const user = await User.findByPk(
            req.userId,
            {
                attributes: ["name", "surname", "email", "phone", "address", "date_of_birth"],
            })

        return res.json(
            {
                success: true,
                message: "Appointments retrieved succesfully",
                user: user,
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
                attributes: ["id", "date", "price"],
                include: [
                    {
                        model: User,
                        as: "patient",
                        attributes: ["name", "surname", "phone"]
                    },
                    {
                        model: Treatment,
                        attributes: ["name"]
                    }
                ]
            }
        );

        const user = await User.findByPk(
            req.userId,
            {
                attributes: {
                    exclude: ["password", "role_id", "createdAt", "updatedAt"]
                },
                // attributes: ["name", "surname", "email", "phone", "address", "date_of_birth"],
            })

        return res.json(
            {
                success: true,
                message: "Appointments retrieved",
                user: user,
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

        // buscamos el tratamiento en la base de datos para poder añadir de forma automatica el precio
        const treatment = await Treatment.findByPk(treatment_id);

        appointment = await Appointment.create(
            {
                user_id_1: patient,
                user_id_2: user_id_2,
                treatment_id: treatment_id,
                price: treatment.price,
                date: date,
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

        // const patientId = req.userId
        const appointmentId = req.params.id
        const { user_id_2, treatment_id, date } = req.body

        // buscamos la cita en la base de datos
        const appointment = await Appointment.findByPk(appointmentId)

        // comprobamos que la cita pertenece al paciente (comentado para que el admin tenga acceso en el front)
        // if (appointment.user_id_1 !== patientId) {
        //     return res.json(
        //         {
        //             success: true,
        //             message: "Incorrect appointment"
        //         }
        //     )
        // }

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

        // buscamos el tratamiento en la base de datos para poder añadir de forma automatica el precio
        const treatment = await Treatment.findByPk(treatment_id);

        updatedAppointment = await Appointment.update(
            {
                user_id_2: user_id_2,
                treatment_id: treatment_id,
                price: treatment.price,
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
                attributes: ["id", "date", "price"],
                include: [
                    {
                        model: Treatment,
                        attributes: ["name"]
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

        // const patientId = req.userId
        const appointmentId = req.params.id

        // buscamos la cita en la base de datos
        const appointment = await Appointment.findByPk(appointmentId)


        // comprobamos que la cita pertenece al paciente (comentado para que el admin pueda borrar las citas en el front)
        // if (appointment.user_id_1 !== patientId) {
        //     return res.json(
        //         {
        //             success: true,
        //             message: "Incorrect appointment"
        //         }
        //     )
        // }

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