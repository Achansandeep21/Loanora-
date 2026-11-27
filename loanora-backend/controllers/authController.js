
const db = require("../config/connectToDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==========================================
// CUSTOMER REGISTRATION
// ==========================================

const register = async (req, res) => {
    try {
        const { full_name, email, phone, gender, password } = req.body;

        // Validate required fields
        if (!full_name || !email || !phone || !gender || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing email or phone
        const [existingUser] = await db.execute(
            `SELECT user_id FROM users
             WHERE email = ? OR phone = ?`,
            [email, phone]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email or phone number already registered"
            });
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);

        // Insert customer
        const [result] = await db.execute(
            `INSERT INTO users
            (full_name, email, phone, gender, password_hash, role, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                full_name,
                email,
                phone,
                gender,
                password_hash,
                "CUSTOMER",
                "ACTIVE"
            ]
        );

        const user = {
            user_id: result.insertId,
            full_name,
            email,
            phone,
            gender,
            role: "CUSTOMER",
            status: "ACTIVE"
        };
        const token = jwt.sign(
            {
                user_id: user.user_id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user
        });

    } catch (error) {
        console.error("Registration Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// ==========================================
// CUSTOMER LOGIN
// LOGIN USING MOBILE NUMBER
// ==========================================

const login = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        // Validate required fields
        if (!mobile || !password) {
            return res.status(400).json({
                success: false,
                message: "Mobile number and password are required"
            });
        }

        // Find customer using mobile number
        const [users] = await db.execute(
            `SELECT * FROM users WHERE phone = ?`,
            [mobile]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid mobile number or password"
            });
        }

        const user = users[0];

        // Check customer role
        if (user.role !== "CUSTOMER") {
            return res.status(403).json({
                success: false,
                message: "This portal is only for customers"
            });
        }

        // Check account status
        if (user.status !== "ACTIVE") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid mobile number or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                user_id: user.user_id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Successful login response
        return res.status(200).json({
            success: true,
            message: "Login successful",

            token,

            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: user.role,
                status: user.status
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
    register,
    login
};
