import { database } from "../database/config.js";
import bcryptjs from 'bcryptjs';
// import {generateVerificationCode} from '../utils/generateVerificationCode.js'
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import sendVerificationMail from "../mail/sendVerificationMail.js";



export const login = async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({success : false, message : "All fields are required"});
  }
  try {
    const db = await database();
    const user = await db.collection('users').findOne({email});
    if(!user){
        return res.status(400).json({success : false, message : "Invalid credentials"});
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({success : false, message : "Invalid credentials"});
    }
    generateTokenAndSetCookies(res, user._id);
    await db.collection('users').updateOne({_id : user._id}, {
      $set : {
        lastLoginAt : Date.now(),
        updateAt : Date.now(),
      }
    })
    res.status(200).json({
        success : true,
        message : "login successfully",
        user : {
            ...user,
            password : undefined,
        }
    })
  } catch (error) {
    res.status(500).json({success : false, message : "internal server error"});
  }
   
};




export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if(!email || !password || !name){
        throw new Error("All Fields are required");
    }
    const db = await database();
    const userAlreadyExist = await db.collection('users').findOne({email});
    console.log("userAlreadyExist" ,userAlreadyExist);
    
    if(userAlreadyExist){
        return res.status(400).json({success : false, message : "user already exist!"})
    }
    const hassedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(1000000 + Math.random() * 90000).toString();
    const userData = {
        name,
        email,
        password : hassedPassword,
        lastLoginAt : Date.now(),
        isVerified : false,
        verificationToken,
        lastupdatedAt : Date.now(),
        createdAt : Date.now(),
        verificationTokenExpireAt : Date.now() + 24 * 60 * 60 * 1000, // 24 HOURS
        resetPasswordToken : undefined,
        resetPasswordTokenExpiresAt : undefined,
        resetPasswordToken : undefined,
        resetPasswordTokenExpiresAt : undefined,
    }

    const user = await db.collection('users').insertOne(userData);
    const recentUserData = await db.collection('users').findOne({_id : user.insertedId});

    generateTokenAndSetCookies(res, user.insertedId);
    await sendVerificationMail(email, verificationToken);

    res.status(200).json({
        success : true,
        message : "user created successfully",
        user : {
            ...recentUserData,
            password : undefined,
        }
    })

  } catch (error) {
    return res.status(400).json({success : false, message : error.message})
  }
};





export const verifyEmail = async (req, res) => {
  const {verificationToken} = req.body;
  if(!verificationToken){
    return res.status(400).json({success : false, message : "verification token is required"});
  }
  try{
    const db = await database();
    const user = await db.collection('users').findOne({
      verificationToken, 
      verificationTokenExpireAt : {$gt : Date.now()}
    });
    if(!user){
        return res.status(400).json({success : false, message : "invalid verification token"});
    }
    await db.collection('users').updateOne({_id : user._id}, {
      $set : {
        isVerified : true,
        verificationToken : undefined,
        verificationTokenExpireAt : undefined,
        updatedAt : Date.now(),
      }
    });
    res.status(200).json({success : true, message : "email verified successfully"});
  }
  catch(error){
    return res.status(500).json({success : false, message : "internal server error"});
  }
};






export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({success : true, message : "logout successfully"});
};
