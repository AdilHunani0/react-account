import { useEffect, useState } from 'react'
import { getCurrentUser, updateCurrentUser } from '../auth'

export default function Account() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const u = getCurrentUser()
    setUser(u)
    if (u) setForm({ name: u.name, email: u.email })
  }, [])

  const handleSave = e => {
    e.preventDefault()
    updateCurrentUser(form)
    setMessage('Account updated successfully!')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3>My Account</h3>
          {message && <div className="alert alert-success">{message}</div>}
          <form onSubmit={handleSave}>
            <input className="form-control mb-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="form-control mb-3" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <button className="btn btn-primary w-100">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  )
}
