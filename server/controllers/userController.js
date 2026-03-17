import JobApplication from "../models/jobApplication.js"
import User from "../models/User.js"
import {v2 as cloudinary } from "cloudinary"
import Job from "../models/jobs.js"
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'


// get user data


export const getUserData = async (req,res)=> {

  const userId = req.user._id

  try {

    const user = await User.findById(userId)

    if (!user){
      return res.json({success:false,message:'User not found'})
    }

    res.json({success:true,user})

  } catch (error) {
    res.json({success:false,message:error.message})
  }

}

// apply for a job

export const applyForJob= async(req,res)=>{

    const {jobId}=req.body

    const userId = req.user._id

    try {
        const isAlreadyApplied = await JobApplication.find({jobId,userId})
        if (isAlreadyApplied.length>0){
            return res.json({success:false,message:'Already Applied'})
        }

        const jobData =await Job.findById(jobId)

        if (!jobData){
            return res.json({success:false,message:'Job not found'})
        }

        await JobApplication.create({
            companyId:jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({success:true,message:'Applied Successfully'})


    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}

// get user applied applicants

export const getUserJobApplications=async (req,res)=>{

    try {
        const userId = req.user._id
        const applications =await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId', 'title description location category level salary')
        .exec()

        if (!applications){
            return res.json({success:false,message:'No job Application found'}) 
        }

          return res.json({success:true,applications})        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}

//update user profile (resume)

export const updateUserResume=async (req,res)=>{

    try {
         const userId = req.user._id

         const resumeFile= req.file 

         const userData= await User.findById(userId)

         if(!userData) {
            return res.json({success:false, message:'User not found in database. Resume update failed.'})
         }

         if (resumeFile){
            const resumeUpload= await cloudinary.uploader.upload(resumeFile.path)
            userData.resume= resumeUpload.secure_url
         }

         await userData.save()

         return res.json({
            success:true,message:'Resume Updated'
         })



    } catch (error) {

        res.json({success:false,message:error.message})
        
    }

}

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing details' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            },
            token: generateToken(user._id)
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// User login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                },
                token: generateToken(user._id)
            });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}