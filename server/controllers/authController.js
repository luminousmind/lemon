const bcrypt = require("bcrypt");
const prisma = require("../prisma/pool");

// Sign up controller
const signup = async (req, res) => {
    const {username, email, password} = req.body;

    // TODO: add sign up validation

    // Check if all fields are provided in request body
    if(!username || !email || !password) {
        return res.status(400).json({error: "Username, email and password are required"});
    }

    try {
        // Scans database to ensure no username or email duplicates
        const emailExists = await prisma.user.findUnique({where: {email}});

        if (emailExists) {
            return res.status(409).json({error: "Email is already used"});
        }

        const usernameExists = await prisma.user.findUnique({where: {username}});

        if (usernameExists) {
            return res.status(409).json({error: "Username is already used"});
        }

        // Create hashed password and add new user to database
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {username, email, password: hashedPassword},
            select: {id: true}
        });

        req.session.userId = user.id;

        // Return success message
        return res.status(200).json({message: "User signed up successfully"});
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
}

// Login controller
const login = async (req, res) => {
    const {email, password} = req.body;

    // TODO: add login validation

    // Check if fields are provided in request body
    if(!email || !password) {
        return res.status(400).json({error: "Email and password are required"});
    }

    try {
        const user = await prisma.user.findUnique({where: {email}});

        if (!user) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        req.session.userId = user.id;

        return res.status(200).json({message: "User logged in successfully"});
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({error: "Failed to logout user"});
        }

        res.clearCookie("qid", {httpOnly: true});

        return res.status(200).json({message: "User logged out successfully"})
    });
}

module.exports = {signup, login, logout};