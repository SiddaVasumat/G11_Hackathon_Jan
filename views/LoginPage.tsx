import { useState } from 'react'
import { signInWithEmail } from '../lib/auth'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setError(null)
    const { error } = await signInWithEmail(email)
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Sign in
        </h1>

        {sent ? (
          <p className="text-green-600 text-center">
            Magic link sent! Check your email 📧
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-yellow-400 py-2 rounded font-medium"
            >
              Send Magic Link
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default LoginPage
