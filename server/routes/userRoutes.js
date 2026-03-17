import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume, registerUser, loginUser } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { protectUser } from '../middleware/authMiddleware.js'

const router = express.Router()

// User Registration
router.post('/register', registerUser)

// User Login
router.post('/login', loginUser)

// get user data
router.get('/user', protectUser, getUserData)

// apply for a job
router.post('/apply', protectUser, applyForJob)

// get applied jobs
router.get('/applications', protectUser, getUserJobApplications)

// update resume
router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume)

export default router