import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/appcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Recruiterlogin = () => {

  const navigate = useNavigate()

  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(null)

  const [isNextDataSubmitted, setIsNextDataSubmitted] = useState(false)

  const { setShowRecruiterLogin, backendUrl, setcompanyToken, setcompanyData } = useContext(AppContext)

  const onSubmitHandler = async (e) => {

    e.preventDefault()

    try {

      // LOGIN
      if (state === "Login") {

        const { data } = await axios.post(
          backendUrl + "/api/company/login",
          { email, password }
        )

        if (data.success) {
          setcompanyData(data.company)
          setcompanyToken(data.token)
          localStorage.setItem("companyToken", data.token)
          setShowRecruiterLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }

      }

      // SIGN UP
      else {

        if (!image) {
          return toast.error("Please upload company logo")
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('password', password)
        formData.append('email', email)
        formData.append('image', image)

        const { data } = await axios.post(
          backendUrl + "/api/company/register",
          formData
        )

        if (data.success) {
          setcompanyData(data.company)
          setcompanyToken(data.token)
          localStorage.setItem("companyToken", data.token)
          setShowRecruiterLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>

        <h1 className='text-center text-2xl text-neutral-700 font-medium'>
          Recruiter {state}
        </h1>

        <p className='text-sm'>{state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Welcome! Please create your account'}</p>


        {/* STEP 2 : Upload Logo */}
        {state === 'Sign Up' && isNextDataSubmitted ? (

          <div className='flex items-center gap-4 my-10'>
            <label htmlFor="image">
              <img
                className='w-16 rounded-full'
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                id="image"
                hidden
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <p>Upload Company <br /> Logo</p>
          </div>

        ) : (

          <>
            {/* Company Name */}
            {state !== 'Login' && (
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.person_icon} alt="" />
                <input
                  className='outline-none text-sm'
                  type="text"
                  placeholder='Company Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.email_icon} alt="" />
              <input
                className='outline-none text-sm'
                type="email"
                placeholder='Email Id'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.lock_icon} alt="" />
              <input
                className='outline-none text-sm'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {state === 'Login' &&
          <p className='text-sm text-blue-600 mt-4 cursor-pointer'>
            Forget Password?
          </p>
        }


        {/* BUTTON */}
        <button
          type={state === "Sign Up" && !isNextDataSubmitted ? "button" : "submit"}
          onClick={() => {
            if (state === "Sign Up" && !isNextDataSubmitted) {
              setIsNextDataSubmitted(true)
            }
          }}
          className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'
        >
          {state === 'Login'
            ? 'Login'
            : isNextDataSubmitted
              ? 'Create Account'
              : 'Next'}
        </button>


        {/* SWITCH LOGIN / SIGNUP */}
        {
          state === 'Login'
            ? <p className='mt-5 text-center'>
              Don't have an account?
              <span
                className='text-blue-600 cursor-pointer'
                onClick={() => {
                  setState('Sign Up')
                  setIsNextDataSubmitted(false)
                }}
              >
                {" "}Sign Up
              </span>
            </p>

            : <p className='mt-5 text-center'>
              Already have an account?
              <span
                className='text-blue-600 cursor-pointer'
                onClick={() => setState('Login')}
              >
                {" "}Login
              </span>
            </p>
        }


        <img
          onClick={() => setShowRecruiterLogin(false)}
          className='absolute top-5 right-5 cursor-pointer'
          src={assets.cross_icon}
          alt=""
        />

      </form>
    </div>
  )
}

export default Recruiterlogin