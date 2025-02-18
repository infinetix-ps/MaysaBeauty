import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import StepIndicator from "../uiAuth/stepIndicator.jsx";
import OtpInput from "../uiAuth/OTPinput.jsx";
import "./auth.css";

function Verify() {
    const [verificationCode, setVerificationCode] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const navigate = useNavigate();

    // Retrieve email from state using useLocation
    const location = useLocation();
    const { email: emailFromState } = location.state || {};
    const [emailState, setEmailState] = useState(emailFromState);

    useEffect(() => {
        if (emailState) setEmail(emailState);
    }, [emailState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://147.93.127.60:4000/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otpCode: verificationCode }),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) throw new Error(data.message);

            toast.success("Email verified successfully!");
            setTimeout(() => navigate("/signup-success"), 2000);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);

        try {
            const response = await fetch("http://147.93.127.60:4000/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setResendLoading(false);

            if (!response.ok) throw new Error(data.message);

            toast.success("A new OTP has been sent to your email!");
        } catch (error) {
            toast.error(error.message);
            setResendLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-card-left bg-secondary">
                        <h2 className="auth-title text-button">Almost There!</h2>
                        <p className="auth-subtitle text-button">Enter the OTP sent to your email.</p>
                    </div>
                    <div className="auth-card-right">
                        <StepIndicator steps={["Account", "Verify", "Complete"]} currentStep={1} />
                        <h1 className="auth-title">Verify Your Email</h1>
                        <p className="mb-6">We've sent a verification code to {email}. Please enter it below.</p>
                        <form onSubmit={handleSubmit} className="auth-form">
                            <OtpInput value={verificationCode} valueLength={6} onChange={setVerificationCode} />
                            <button type="submit" className="auth-button" disabled={loading}>
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                        </form>
                        <button className="auth-button resend-btn" onClick={handleResendOTP} disabled={resendLoading}>
                            {resendLoading ? "Resending..." : "Resend Code"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verify;
