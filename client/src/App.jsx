import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Application from './pages/Application.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Recruiterlogin from './components/Recruiterlogin.jsx'
import UserLogin from './components/UserLogin.jsx'
import { AppContext } from './context/appcontext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Addjob from './pages/Addjob.jsx'
import Viewapplications from './pages/Viewapplications.jsx'
import Managejobs from './pages/Managejobs.jsx'
import { ProtectedCompanyRoute, ProtectedUserRoute } from './components/ProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const { showRecruiterLogin, showUserLogin } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <Recruiterlogin />}
      {showUserLogin && <UserLogin />}
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />

        {/* User-protected route */}
        <Route
          path='/application'
          element={
            <ProtectedUserRoute>
              <Application />
            </ProtectedUserRoute>
          }
        />

        {/* Company-protected dashboard routes */}
        <Route
          path='/dashboard'
          element={
            <ProtectedCompanyRoute>
              <Dashboard />
            </ProtectedCompanyRoute>
          }
        >
          <Route path='add-job' element={<Addjob />} />
          <Route path='view-applications' element={<Viewapplications />} />
          <Route path='manage-jobs' element={<Managejobs />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App