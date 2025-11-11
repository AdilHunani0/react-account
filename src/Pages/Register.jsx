import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../auth'

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')
    try {
      registerUser(form)
      nav('/account')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3>Register</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Full Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="form-control mb-2" type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <input className="form-control mb-3" type="password" placeholder="Confirm Password" onChange={e => setForm({ ...form, confirm: e.target.value })} />
            <button className="btn btn-success w-100">Create Account</button>
          </form>
          <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}
