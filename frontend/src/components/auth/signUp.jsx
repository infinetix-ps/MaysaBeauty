import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import StepIndicator from "../uiAuth/stepIndicator.jsx"
import "./auth.css"


function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return re.test(password)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        if (!email || !validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }))
            toast.error("Please enter a valid email address")
            return
        }

        if (!password || !validatePassword(password)) {
            setErrors((prev) => ({
                ...prev,
                password:
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
            }))
            toast.error("Please enter a valid password")
            return
        }

        try {
            // TODO: Implement account creation and email sending logic here
            console.log("Creating account for:", email)
            toast.success("Verification email sent successfully!")
            navigate(`/verify?email=${encodeURIComponent(email)}`)
        } catch (error) {
            console.error("Error creating account:", error)
            toast.error("Failed to create account. Please try again.")
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-card-left bg-secondary">
                        <h2 className="auth-title text-button">Join Us</h2>
                        <p className="auth-subtitle text-button">Experience the future of online shopping.</p>
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
                        <StepIndicator steps={["Account", "Verify", "Complete"]} currentStep={0} />
                        <h1 className="auth-title text-button">Create Account</h1>
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
                            <button type="submit" className="auth-button">
                                Create Account
                                <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <Link to="/signin" className="auth-link">
                                Already have an account? Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp

