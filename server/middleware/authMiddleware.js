import jwt from "jsonwebtoken"
import Company from "../models/Company.js"
import User from "../models/User.js"

export const protectCompany = async (req, res, next) => {

    const token = req.headers.token

    if (!token) {
        return res.json({ success: false, message: "Not authorised login again" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.company = await Company.findById(decoded.id).select("-password")

        next()

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const protectUser = async (req, res, next) => {
    
    // Check both 'token' query/body or Authorization header 'Bearer token' (or custom 'token' header for consistency with company)
    const token = req.headers.token

    if (!token) {
        return res.json({ success: false, message: "Not authorised login again" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}