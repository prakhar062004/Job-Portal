import express from 'express'
import { getJobBYID, getJobs } from '../controllers/jobController.js';

const router =express.Router()


//route to get all jobs data
router.get('/',getJobs)


//routes to get a single job ny Id
router.get('/:id',getJobBYID)

export default router;