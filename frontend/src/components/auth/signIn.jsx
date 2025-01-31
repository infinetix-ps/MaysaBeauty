import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import StepIndicator from "../uiAuth/stepIndicator.jsx"
import "./auth.css"

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        if (!email) {
            setErrors((prev) => ({ ...prev, email: "Email is required" }))
            toast.error("Please enter your email address")
            return
        }

        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email format" }))
            toast.error("Please enter a valid email address")
            return
        }

        if (!password) {
            setErrors((prev) => ({ ...prev, password: "Password is required" }))
            toast.error("Please enter your password")
            return
        }

        try {
            // TODO: Implement sign-in logic here
            console.log("Signing in with:", email, password)
            toast.success("Sign in successful!")
            navigate("/dashboard")
        } catch (error) {
            console.error("Error signing in:", error)
            toast.error("Failed to sign in. Please check your credentials and try again.")
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-card-left bg-secondary">
                        <h2 className="auth-title text-button">Welcome Back!</h2>
                        <p className="auth-subtitle text-button">Sign in to access your account and continue shopping.</p>
                        <div className="auth-icon-container">
                            <div className="auth-icon bg-main">
                                <i className="fas fa-user text-button text-xl"></i>
                            </div>
                            <div className="auth-icon bg-main">
                                <i className="fas fa-envelope text-button text-xl"></i>
                            </div>
                            <div className="auth-icon bg-main">
                                <i className="fas fa-lock text-button text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="auth-card-right bg-main">
                        <StepIndicator steps={["Credentials", "Authenticated"]} currentStep={0} />
                        <h1 className="auth-title text-button">Sign In</h1>
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div>
                                <div className="auth-input-container">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="auth-input text-tertiary"
                                        placeholder="Email Address"
                                        required
                                    />
                                    <i className="fas fa-envelope auth-input-icon"></i>
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-600 break-words">{errors.email}</p>}
                            </div>
                            <div>
                                <div className="auth-input-container">
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="auth-input text-tertiary"
                                        placeholder="Password"
                                        required
                                    />
                                    <i className="fas fa-lock auth-input-icon"></i>
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600 break-words">{errors.password}</p>}
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-button focus:ring-button border-tertiary rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-button">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <Link to="/forgot-password" className="font-medium text-button hover:text-opacity-80">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            <button type="submit" className="auth-button">
                                Sign In
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <Link to="/signup" className="auth-link">
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn

