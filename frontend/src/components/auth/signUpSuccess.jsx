import { Link } from "react-router-dom"
import StepIndicator from "../uiAuth/stepIndicator.jsx"
import "./auth.css"

function SignUpSuccess() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-card-left bg-secondary">
                        <h2 className="auth-title text-button">Welcome Aboard!</h2>
                        <p className="auth-subtitle">
                            Your account has been created successfully. Get ready for an amazing shopping experience!
                        </p>
                        {/* <div className="auth-icon-container">
                            <div className="auth-icon bg-main">
                                <i className="fas fa-check-circle text-button text-xl"></i>
                            </div>
                            <div className="auth-icon bg-main">
                                <i className="fas fa-shopping-bag text-button text-xl"></i>
                            </div>
                        </div> */}
                    </div>
                    <div className="auth-card-right flex flex-col justify-center">
                        <StepIndicator steps={["Account", "Verify", "Complete"]} currentStep={2} />
                        <div className="mb-8 text-center">
                            <i className="fas fa-check-circle text-green-500 text-6xl"></i>
                        </div>
                        <h1 className="auth-title text-gray-800 text-center">Account Created Successfully!</h1>
                        <p className="text-gray-600 mb-8 text-center">
                            Your account has been created and you're now ready to start shopping.
                        </p>
                        <Link to="/signin" className="auth-button text-center">
                            Sign In to Your Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpSuccess
