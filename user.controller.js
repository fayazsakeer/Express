import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

let { sign, verify } = jwt;
export async function register(req, res) {
  try {
    let { username, email, password } = req.body;
    console.log(req.body);
    
    let userExists = await userModel.findOne({ username });
    if (userExists)
      return res.status(400).json({ msg: "username already exist" });
    let hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ username, email, password: hashedPassword });
    return res.status(201).json({ msg: "Registration success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to register" });
  }
}
export async function login(req, res) {
  try {
    let { username, password } = req.body;
    let user = await userModel.findOne({ username });
    if (!user)
      return res.status(401).json({ msg: "invalid username or password" });
    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ msg: "invalid username or password" });
    let token = await sign(
      {
        userid: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({msg : "login successful",token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to login" });
  }
}
export async function profile(req, res) {
  try {
    let { username } = req.user;
    let user = await userModel.findOne({ username }, { password: 0 });
    res.status(200).json({ msg: "Data fetched successfully", ...user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to login" });
  }
}
export async function editEmail(req, res) {
  try {
      let { userid } = req.user;
      let { newEmail } = req.body;
      console.log(userid, newEmail);
      

     let user = await userModel.updateOne({ _id: userid }, { email: newEmail });
     console.log(user);
     
     res.status(200).json({ msg: "Email updated successfully" });
     
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to update email" });
  }
}
export async function editPassword(req, res) {
  try {
      let { userid } = req.user;
      let { oldpass , newpass1, newpass2  } = req.body;
      console.log(userid, oldpass,newpass1,newpass2);
      let user = await userModel.findOne({ password });
       if (!user)
        return res.status(401).json({ msg: "invalid username or password" });
       let isValid = await bcrypt.compare(oldpass, user.password);
       if (!isValid)
        return res.status(401).json({ msg: "invalid username or password" });  
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to update password" });
  }
}
