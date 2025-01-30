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
                    <div className="auth-card-left bg-black text-white">
                        <h2 className="auth-title">Welcome Back!</h2>
                        <p className="auth-subtitle">Sign in to access your account and continue shopping.</p>
                        <div className="auth-icon-container">
                            <div className="auth-icon bg-white">
                                <i className="fas fa-user text-black text-xl"></i>
                            </div>
                            <div className="auth-icon bg-white">
                                <i className="fas fa-envelope text-black text-xl"></i>
                            </div>
                            <div className="auth-icon bg-white">
                                <i className="fas fa-lock text-black text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="auth-card-right">
                        <StepIndicator steps={["Credentials", "Authenticated"]} currentStep={0} />
                        <h1 className="auth-title text-gray-800">Sign In</h1>
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="auth-input-container">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`auth-input ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="you@example.com"
                                        required
                                    />
                                    <i className="fas fa-envelope auth-input-icon"></i>
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="auth-input-container">
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`auth-input ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <i className="fas fa-lock auth-input-icon"></i>
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-black hover:text-gray-800">
                                        Forgot your password?
                                    </a>
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
