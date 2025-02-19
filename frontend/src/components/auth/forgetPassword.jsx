import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"  // Import axios for making requests
import StepIndicator from "../uiAuth/stepIndicator.jsx"
import "./auth.css"

function ForgotPassword() {
    const [email, setEmail] = useState("")  // Email state
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        // Validate the email format
        if (!email || !validateEmail(email)) {
            setErrors({ email: "Please enter a valid email address" })
            toast.error("Please enter a valid email address")
            return
        }

        try {
            // Send PATCH request to the backend
            const response = await axios.patch("https://api.maysabeauty.store/auth/sendCode", { email })

            if (response.status === 200) {
                // If the request is successful, show a success message
                toast.success("Password reset email sent successfully!")
                // Pass the email in the state when navigating to reset-password page
                navigate(`/reset-password`, { state: { email } })
            }
        } catch (error) {
            // If an error occurs, show an error message
            console.error("Error sending password reset email:", error)
            toast.error("Failed to send password reset email. Please try again.")
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-card-left bg-secondary">
                        <h2 className="auth-title text-button">Forgot Password?</h2>
                        <p className="auth-subtitle text-button">Don't worry, we've got you covered.</p>
                        {/* <div className="auth-icon-container">
                            <div className="auth-icon bg-main">
                                <i className="fas fa-lock text-button text-xl"></i>
                            </div>
                            <div className="auth-icon bg-main">
                                <i className="fas fa-envelope text-button text-xl"></i>
                            </div>
                            <div className="auth-icon bg-main">
                                <i className="fas fa-key text-button text-xl"></i>
                            </div>
                        </div> */}
                    </div>
                    <div className="auth-card-right">
                        <StepIndicator steps={["Request", "Reset", "Complete"]} currentStep={0} />
                        <h1 className="auth-title text-button">Reset Your Password</h1>
                        <p className="text-tertiary mb-6">
                            Enter your email address and we'll send you instructions to reset your password.
                        </p>
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
                            <button type="submit" className="auth-button">
                                Send Reset Instructions
                                <i className="fas fa-paper-plane ml-2"></i>
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <Link to="/signin" className="auth-link">
                                Remember your password? Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
