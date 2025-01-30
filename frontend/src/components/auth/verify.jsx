import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import StepIndicator from "../uiAuth/stepIndicator.jsx"
import OtpInput from "../uiAuth/OTPinput.jsx"
import "./auth.css"

function Verify() {
    const [verificationCode, setVerificationCode] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const emailParam = searchParams.get("email")
        if (emailParam) {
            setEmail(emailParam)
        }
    }, [searchParams])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        if (!verificationCode) {
            setErrors({ verificationCode: "Verification code is required" })
            toast.error("Please enter the verification code")
            return
        }

        if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
            setErrors({ verificationCode: "Invalid verification code" })
            toast.error("Please enter a valid 6-digit verification code")
            return
        }

        try {
            // TODO: Implement verification logic here
            console.log("Verifying code:", verificationCode)
            toast.success("Verification successful!")
            navigate("/signup-success")
        } catch (error) {
            console.error("Error verifying code:", error)
            toast.error("Failed to verify code. Please try again.")
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-card-left bg-black text-white">
                        <h2 className="auth-title">Almost There!</h2>
                        <p className="auth-subtitle">
                            Enter the verification code sent to your email to complete your registration.
                        </p>
                        <div className="auth-icon-container">
                            <div className="auth-icon bg-white">
                                <i className="fas fa-envelope text-black text-xl"></i>
                            </div>
                            <div className="auth-icon bg-white">
                                <i className="fas fa-check-circle text-black text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="auth-card-right">
                        <StepIndicator steps={["Account", "Verify", "Complete"]} currentStep={1} />
                        <h1 className="auth-title text-gray-800">Verify Your Email</h1>
                        <p className="text-gray-600 mb-6">We've sent a verification code to {email}. Please enter it below.</p>
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div>
                                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                                    Verification Code
                                </label>
                                <OtpInput value={verificationCode} valueLength={6} onChange={setVerificationCode} />
                                {errors.verificationCode && <p className="mt-2 text-sm text-red-600">{errors.verificationCode}</p>}
                            </div>
                            <button type="submit" className="auth-button bg-black">
                                Verify
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verify

