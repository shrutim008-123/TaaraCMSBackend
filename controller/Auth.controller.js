import userModel from "../model/User.Model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
      }

      const user = new userModel({ userName, password: hash });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
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
        res.status(500).json({ error: "Server error" });
      }

      if (result) {
        res.status(200).json({ message: "Login successful" });
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
