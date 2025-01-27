const bcrypt = require("bcrypt");
const prisma = require("../prisma/pool");

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    // TODO: Add sign up validation

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

        await prisma.user.create({
            data: {username, email, password: hashedPassword},
            select: {id: true}
        });

        // Return success message
        return res.status(200).json({message: "User signed up successfully"})
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {signup};