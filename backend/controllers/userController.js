import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validtor from "validator";
import dotenv from "dotenv";



//login User
const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ sucess:"false", message: "User not found" });
        }
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ sucess:"false", message: "Invalid credentials" });
        }
        // Generate a token
        const token = createToken(user._id);
        res.status(200).json({ sucess:"true", user: { name: user.name, email: user.email, token } });
    }
    catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ sucess:"false", message: "Internal server error" });
    }

}
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, );
}

// Register User
const registerUser = async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const exists = await userModel.findOne({ email });
            // Check if user already exists
            if (exists) {
                return res.status(400).json({ sucess:"false", message: "User already exists" });
            }
            // Validate email format and strong password
            if (!validtor.isEmail(email)) {
                return res.status(400).json({ sucess:"false", message: "Invalid email format" });
            }
            // Check password strength
            if (!validtor.isStrongPassword(password, { minLength: 8, minSymbols: 0 })) {
                return res.status(400).json({ sucess:"false", message: "Weak password. It should be at least 8 characters long and contain a mix of letters and numbers." });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user
            const newUser = new userModel({
                name:name,
                email:email,
                password: hashedPassword
            });
            const user=await newUser.save();

            // Generate a token
            const token = createToken(user._id);
            res.status(201).json({ sucess:"true", user: { name: user.name, email: user.email, token } });

        } catch (error) {
          console.error("Error registering user:", error);
          res.status(500).json({ sucess:"false", message: "Internal server error" });  
        }
};

export default { loginuser, registerUser };
