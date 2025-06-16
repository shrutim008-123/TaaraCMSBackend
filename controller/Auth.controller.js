import userModel from "../model/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Zl#ZO1,qfcw9Oq}"; // Ideally use env variable

const registerUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }

      const user = new userModel({ userName, password: hash });
      await user.save();

      // Generate token
      const token = jwt.sign(
        { id: user._id, userName: user.userName },
        JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(201).json({ message: "User registered successfully", token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }

      if (result) {
        const token = jwt.sign(
          { id: user._id, userName: user.userName },
          JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { registerUser, loginUser };
