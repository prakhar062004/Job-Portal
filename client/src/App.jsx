import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Application from './pages/application'
import ApplyJob from './pages/applyjob'
import Recruiterlogin from './components/Recruiterlogin'

import { AppContext } from './context/appcontext'
import Dashboard from './pages/Dashboard'
import Addjob from './pages/Addjob'
import Viewapplications from './pages/Viewapplications'
import Managejobs from './pages/Managejobs'
import 'quill/dist/quill.snow.css'

const App = () => {

  const { showRecruiterLogin } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <Recruiterlogin />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/application' element={<Application />} />

       
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='add-job' element={<Addjob />} />
          <Route path='view-applications' element={<Viewapplications />} />
          <Route path='manage-jobs' element={<Managejobs />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App