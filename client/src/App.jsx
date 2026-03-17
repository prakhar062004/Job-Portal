import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/application'
import ApplyJob from './pages/applyjob'
import Recruiterlogin from './components/Recruiterlogin'
import UserLogin from './components/UserLogin'

import { AppContext } from './context/appcontext'
import Dashboard from './pages/Dashboard'
import Addjob from './pages/Addjob'
import Viewapplications from './pages/Viewapplications'
import Managejobs from './pages/Managejobs'
// import 'react-quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify';
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

const App = () => {

  const { showRecruiterLogin, showUserLogin, companyToken } = useContext(AppContext)
 
  return (
    <div>
      {showRecruiterLogin && <Recruiterlogin />}
      {showUserLogin && <UserLogin />}
      <ToastContainer/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/application' element={<Application />} />
        
       
        <Route path='/dashboard' element={<Dashboard />}>

         {
         companyToken ? <>
            <Route path='add-job' element={<Addjob />} />
          <Route path='view-applications' element={<Viewapplications />} />
          <Route path='manage-jobs' element={<Managejobs />} />
         </>:null
         }
         
        </Route>

      </Routes>
    </div>
  )
}

export default App