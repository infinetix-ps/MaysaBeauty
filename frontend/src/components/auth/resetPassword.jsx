import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import StepIndicator from "../uiAuth/stepIndicator.jsx"
import OtpInput from "../uiAuth/OTPinput.jsx"
import "./auth.css"

function ResetPassword() {
    const [step, setStep] = useState(1) // 1 for password, 2 for verification
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const email = new URLSearchParams(location.search).get("email")

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return re.test(password)
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        if (!validatePassword(newPassword)) {
            setErrors((prev) => ({
                ...prev,
                newPassword:
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
            }))
            toast.error("Please enter a valid password")
            return
        }

        if (newPassword !== confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
            toast.error("Passwords do not match")
            return
        }

        try {
            // TODO: Implement password validation and proceed to verification
            console.log("Password validated, proceeding to verification for:", email)
            setStep(2)
        } catch (error) {
            console.error("Error validating password:", error)
            toast.error("Failed to proceed. Please try again.")
        }
    }

    const handleVerificationSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        if (verificationCode.length !== 6) {
            setErrors((prev) => ({ ...prev, verificationCode: "Please enter a valid 6-digit verification code" }))
            toast.error("Please enter a valid verification code")
            return
        }

        try {
            // TODO: Implement password reset logic here
            console.log("Resetting password for:", email, "with code:", verificationCode)
            toast.success("Password reset successfully!")
            navigate("/signin")
        } catch (error) {
            console.error("Error resetting password:", error)
            toast.error("Failed to reset password. Please try again.")
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-card-left bg-secondary">
                        <h2 className="auth-title text-button">Reset Password</h2>
                        <p className="auth-subtitle text-button">
                            {step === 1
                                ? "Choose a new secure password for your account."
                                : "Enter the verification code sent to your email."}
                        </p>
                        <div className="auth-icon-container">
                            <div className="auth-icon bg-main">
                                <i className="fas fa-lock text-button text-xl"></i>
                            </div>
                            <div className="auth-icon bg-main">
                                <i className="fas fa-key text-button text-xl"></i>
                            </div>
                            <div className="auth-icon bg-main">
                                <i className="fas fa-check-circle text-button text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="auth-card-right">
                        <StepIndicator steps={["Request", "Reset", "Complete"]} currentStep={step} />
                        <h1 className="auth-title text-button">Set New Password</h1>

                        {step === 1 ? (
                            <form onSubmit={handlePasswordSubmit} className="auth-form">
                                <div>
                                    <div className="auth-input-container">
                                        <input
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="auth-input text-text"
                                            placeholder="New Password"
                                            required
                                        />
                                        <i className="fas fa-lock auth-input-icon"></i>
                                    </div>
                                    {errors.newPassword && <p className="mt-2 text-sm text-red-600 break-words">{errors.newPassword}</p>}
                                </div>
                                <div>
                                    <div className="auth-input-container">
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="auth-input text-text"
                                            placeholder="Confirm New Password"
                                            required
                                        />
                                        <i className="fas fa-lock auth-input-icon"></i>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600 break-words">{errors.confirmPassword}</p>
                                    )}
                                </div>
                                <button type="submit" className="auth-button">
                                    Continue
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerificationSubmit} className="auth-form">
                                <div>
                                    <label htmlFor="verificationCode" className="block text-sm font-medium text-text mb-1">
                                        Verification Code
                                    </label>
                                    <p className="text-text-light mb-4">Enter the 6-digit code sent to {email}</p>
                                    <OtpInput value={verificationCode} valueLength={6} onChange={setVerificationCode} />
                                    {errors.verificationCode && (
                                        <p className="mt-2 text-sm text-red-600 break-words">{errors.verificationCode}</p>
                                    )}
                                </div>
                                <button type="submit" className="auth-button">
                                    Reset Password
                                    <i className="fas fa-check ml-2"></i>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

