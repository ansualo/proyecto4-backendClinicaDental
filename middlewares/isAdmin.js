
const isAdmin = (req, res, next) => {
    try {

        if (req.roleId !== 3) {
            return res.json({
                success: true,
                message: "Access denied"
            });
        }

        next()

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Access denied",
                error: error
            }
        );
    }
}


module.exports = isAdmin;