const db = require("../config/connectToDB");

// GET LOGGED-IN CUSTOMER PROFILE
const getProfile = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const [users] = await db.execute(
            `SELECT
                user_id,
                full_name,
                email,
                phone,
                gender,
                role,
                status,
                created_at
             FROM users
             WHERE user_id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer profile fetched successfully",
            user: users[0]
        });

    } catch (error) {
        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { getProfile };