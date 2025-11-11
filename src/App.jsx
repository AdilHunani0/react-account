import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import { getCurrentUser } from './auth'

// ✅ Protects private routes (like /account)
function PrivateRoute({ children }) {
  const user = getCurrentUser()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    // ✅ Wrap entire app in BrowserRouter (important fix)
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h4>404 - Not Found</h4>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
