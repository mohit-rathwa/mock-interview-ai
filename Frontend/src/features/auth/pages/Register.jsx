import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import '../auth.form.scss'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { loading, error, clearError, handleRegister } = useAuth()

    useEffect(() => {
        if (clearError) clearError()
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({ username, email, password })
        if (success) {
            navigate("/dashboard")
        }
    }

    if (loading) {
        return (
            <main>
                <div className="form-container" style={{ textAlign: 'center' }}>
                    <h1>Creating Account...</h1>
                    <p>Setting up your interview workspace</p>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <Link to="/" className="back-link">
                    &larr; Back to Home
                </Link>

                <div className="form-header">
                    <h1>Create Account</h1>
                    <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Join to save your interview strategies, upload PDF resumes, and track progress</p>
                </div>

                {error && (
                    <div className="error-alert">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Full Name / Username</label>
                        <input
                            required
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='e.g. John Doe' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='name@example.com' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Minimum 6 characters' />
                    </div>

                    <button type="submit" className='button primary-button' style={{ width: '100%', marginTop: '0.5rem' }}>
                        Create Account
                    </button>

                </form>

                <div className="guest-divider">
                    <span>or explore first</span>
                </div>

                <Link to="/demo" className="guest-button">
                    ? Try Instant Demo — No Account Needed
                </Link>

                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                    Already have an account? <Link to={"/login"} style={{ color: '#e1034d', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </main>
    )
}

export default Register
