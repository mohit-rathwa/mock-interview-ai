import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, error, setError } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user)
                return true
            } else {
                setError("Invalid email or password. Please try again.")
                return false
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Login failed. Please try again."
            setError(message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
                return true
            } else {
                setError("Registration failed. Please try again.")
                return false
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Registration failed. Please try again."
            setError(message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        setError(null)
        try {
            await logout()
            setUser(null)
        } catch (err) {
            // Still clear user on logout failure
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    // Clear error when user navigates
    const clearError = () => setError(null)

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                if (data && data.user) {
                    setUser(data.user)
                }
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, error, clearError, handleRegister, handleLogin, handleLogout }
}
