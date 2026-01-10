import { useState } from 'react'
import { signInWithEmail } from '../lib/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true)
    setMessage(null)

    const { error } = await signInWithEmail(email)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('✅ Magic link sent! Check your email.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>

        {message && (
          <p className="text-sm text-center mt-3">{message}</p>
        )}
      </div>
    </div>
  )
}

export default Login
