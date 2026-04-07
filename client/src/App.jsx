import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Application'
import ApplyJob from './pages/ApplyJob'
import Recruiterlogin from './components/Recruiterlogin'
import UserLogin from './components/UserLogin'
import { AppContext } from './context/appcontext'
import Dashboard from './pages/Dashboard'
import Addjob from './pages/Addjob'
import Viewapplications from './pages/Viewapplications'
import Managejobs from './pages/Managejobs'
import { ProtectedCompanyRoute, ProtectedUserRoute } from './components/ProtectedRoute'
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