import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import companyRoutes from './routes/companyRoutes.js' 
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'


const app = express()

// connect to database
await connectDB()
await connectCloudinary()

const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://job-portal-khaki-phi.vercel.app/' // Your new Vercel frontend
];

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => res.send("API working"))

app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/company', companyRoutes)




// PORT

Sentry.setupExpressErrorHandler(app);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})