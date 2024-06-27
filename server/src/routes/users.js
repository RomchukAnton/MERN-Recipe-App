import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";


const router = express.Router();


router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username });

    if (user) {
        return res.json({ message: "userExists" });
    }

    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_NUM);

    const newUser = new UserModel({ username: username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "registrationOk" });
});



router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username });

    if (!user) {
        return res.json({ message: "notExist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "inputIncorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    
    res.json({ token, userID: user._id, message: "success" });   
});



export { router as userRouter };