

// export default SignIn;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // To decode Google token
import StepIndicator from "../uiAuth/stepIndicator.jsx";
import "./auth.css";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual Client ID

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!email) {
            setErrors((prev) => ({ ...prev, email: "Email is required" }));
            toast.error("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
            toast.error("Please enter a valid email address");
            return;
        }

        if (!password) {
            setErrors((prev) => ({ ...prev, password: "Password is required" }));
            toast.error("Please enter your password");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });
            localStorage.setItem("token", response.data.token);
            toast.success("Sign in successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in:", error);
            toast.error("Failed to sign in. Please check your credentials and try again.");
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const decodedToken = jwtDecode(credentialResponse.credential);
            const { email, name, sub: googleId } = decodedToken;

            // Send the Google login data to your backend for verification
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/google-login`, {
                email,
                name,
                googleId
            });

            localStorage.setItem("token", response.data.token);
            toast.success("Google Sign-In successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Google Sign-In error:", error);
            toast.error("Failed to sign in with Google.");
        }
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-card-content">
                        {/* Left Card */}
                        <div className="auth-card-left bg-secondary">
                            <h2 className="auth-title text-button">Welcome Back!</h2>
                            <p className="auth-subtitle text-button">Sign in to access your account.</p>
                        </div>

                        {/* Right Card */}
                        <div className="auth-card-right">
                            <StepIndicator steps={["Credentials", "Authenticated"]} currentStep={0} />
                            <h1 className="auth-title text-right">Sign In</h1>

                            {/* Regular Email & Password Sign-In */}
                            <form onSubmit={handleSubmit} className="auth-form">
                                <div className="mb-6">
                                    <div className="auth-input-container group">
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="auth-input peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label htmlFor="email" className="auth-input-label">
                                            Email Address
                                        </label>
                                        <i className="fas fa-envelope auth-input-icon"></i>
                                    </div>
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                <div className="mb-6">
                                    <div className="auth-input-container group">
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="auth-input peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label htmlFor="password" className="auth-input-label">
                                            Password
                                        </label>
                                        <i className="fas fa-lock auth-input-icon"></i>
                                    </div>
                                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <button type="submit" className="auth-button group">
                                    <span className="relative">
                                        Sign In
                                        <span className="auth-button-underline"></span>
                                    </span>
                                </button>
                            </form>
                            <div className="text-sm">
                                    <Link to="/forgot-password" className="font-medium text-right hover:text-opacity-80">
                                        Forgot your password?
                                    </Link>
                                </div>
                            {/* Google Sign-In Button */}
                            <div className="mt-6 text-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => toast.error("Google Sign-In failed")}
                                />
                            </div>

                            <div className="mt-6 text-center">
                                <Link to="/signup" className="auth-link">
                                    Don't have an account? Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default SignIn;
