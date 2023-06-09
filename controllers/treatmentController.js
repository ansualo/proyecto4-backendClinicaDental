const { Treatment } = require('../models');

const treatmentController = {};


treatmentController.getAllTreatments = async (req, res) => {

    try{
        const treatments = await Treatment.findAll();
        return res.json(
        {
            success: true,
            message: "All treatments retrieved",
            data: treatments
        });
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Treatments cannot be retrieved",
                error: error.message
            }
        );
    }
}

treatmentController.createTreatment = async (req, res) => {

    try{
        let body = req.body;

        const newTreatment = await Treatment.create(
            {
                name: body.name,
                price: body.price
            }
        );
        return res.json(
            {
                success: true,
                message: "New treatment created",
                data: newTreatment
            }
        );
    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "treatment cannot be created",
                error: error.message
            }
        );
    }
}

treatmentController.updateTreatment = async (req, res) => {
    try{
        const treatmentId = req.params.id;

        const { name, price } = req.body;
   
        const updatedTreatment = await Treatment.update(
            {
                name: name,
                price: price
            },
            {
                where: {
                    id: treatmentId
                }
            }
        );
        return res.json(
            {
                success: true,
                message: "Treatment updated successfully",
                data: updatedTreatment
            }
        );
    }
    catch (error){
        return res.status(500).json(
            {
                success: false,
                message: "Treatment cannot be updated",
                error: error.message
            }
        );
    }
}

treatmentController.deleteTreatment = async (req, res) => {
    try {
        const treatmentId = req.params.id;

        const deletedTreatment = await Treatment.destroy(
            {
                where: {
                    id: treatmentId
                }
            }
        );
        return res.json(
            {
                success: true,
                message: "Treatment deleted successfully",
                data: deletedTreatment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Treatment cannot be deleted",
                error: error.message
            }
        );
    }
}

module.exports = treatmentController;