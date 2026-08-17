import { findOne, create, findById } from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register User
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const userExists = await findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // create User
    const user = await create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Login User

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    //find User
    const user = await findOne({ email });

    // check user & password

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
      s;
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// get user profile

export async function getUserPofile(req, res) {
  try {
    const user = await findById(req.user._id);

    if (user) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
