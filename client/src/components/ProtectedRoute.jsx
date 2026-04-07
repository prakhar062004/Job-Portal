import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/appcontext'

/**
 * Wraps routes that require a logged-in company (recruiter).
 * Redirects unauthenticated visitors to the home page.
 */
export const ProtectedCompanyRoute = ({ children }) => {
    const { companyToken } = useContext(AppContext)
    return companyToken ? children : <Navigate to="/" replace />
}

/**
 * Wraps routes that require a logged-in user (job seeker).
 * Redirects unauthenticated visitors to the home page.
 */
export const ProtectedUserRoute = ({ children }) => {
    const { userToken } = useContext(AppContext)
    return userToken ? children : <Navigate to="/" replace />
}
