import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ messege: "User already exist" })
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ messege: " Enter valid Email" })
    }
    if (password.length < 8) {
      return res.status(400).json({ messege: " Enter strong password" })
    }
    let hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hashPassword })
    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json(user)
  } catch (error) {
    console.log("registration error")
    return res.status(500).json({ messege: `registration error ${error}` })
  }
}

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ messege: "User is not found" })

    }
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(500).json({ messege: "incorrect password" })
    }

    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json(user)

  } catch (error) {
    console.log("Login error")
    return res.status(500).json({ messege: `Login error ${error}` })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token"){
    httpOnly:true,
    secure:true,
    sameSite:"none"
  }); 
    return res.status(200).json({ message: "Logout successfull" })
  catch (error) {
    console.log("Logout error")
    return res.status(500).json({ messege: `Logout error ${error}` })
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({
        name, email
      })

    }

    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json(user)

  } catch (error) {
    console.log("googleLogin error")
    return res.status(500).json({ messege: `googleLogin error ${error}` })
  }
}


export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      let token = await genToken1(email)
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000
      })
      return res.status(200).json(token)

    }

    return res.status(400).json({ message: "Invalid credentials" })

  } catch (error) {
    console.log("AdminLogin error")
    return res.status(500).json({ messege: `AdminLogin error ${error}` })
  }
}



