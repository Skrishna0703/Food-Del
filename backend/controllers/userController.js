import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator"; // fixed typo
import dotenv from "dotenv";

// Create token
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Login User
const loginuser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid credentials" });
		}

		const token = createToken(user._id);
		res.status(200).json({
			success: true,
			token,
			user: { name: user.name, email: user.email },
		});
	} catch (error) {
		console.error("Error finding user:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

// Register User
const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const exists = await userModel.findOne({ email });
		if (exists) {
			return res
				.status(400)
				.json({ success: false, message: "User already exists" });
		}

		if (!validator.isEmail(email)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid email format" });
		}

		if (
			!validator.isStrongPassword(password, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			return res.status(400).json({
				success: false,
				message:
					"Weak password. Must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();
		const token = createToken(user._id);

		res.status(201).json({
			success: true,
			token,
			user: { name: user.name, email: user.email },
		});
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export default { loginuser, registerUser };
