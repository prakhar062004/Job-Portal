import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/appcontext'


const Navbar = () => {

    const navigate=useNavigate()

    const {setShowRecruiterLogin, setShowUserLogin, userData, setUserToken, setUserData, setUserApplications}=useContext(AppContext)

    const logoutUser = () => {
       setUserToken(null)
       setUserData(null)
       setUserApplications([])
       localStorage.removeItem('userToken')
       navigate('/')
    }


  return (
    <div className='shadow py-4'>
        <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between'>
            <img onClick={()=> navigate('/')} className='cursor-pointer' src={assets.logo} alt="logo" />
            {
                userData
                ?<div className='flex items-center gap-3'>
                    <Link to='/application' >Applied Jobs</Link>
                    <p>|</p>
                    <p className='max-sm:hidden'>Hi, {userData.name}</p>
                    <button onClick={logoutUser} className='bg-red-50 text-red-600 px-4 py-1.5 rounded-full cursor-pointer hover:bg-red-100'>Logout</button> 
                </div>
                :<div className='flex items-center gap-4'>
                <button onClick={e=> setShowRecruiterLogin(true)} className='text-gray-600 cursor-pointer hover:text-gray-800 transition-colors'>Recruiter Login</button>
                <button
                  onClick={() => setShowUserLogin(true)}
                  className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer transform transition duration-150 ease-in-out hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Login
                </button>
            </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar