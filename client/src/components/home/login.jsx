
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, clearError, sendOTP, verifyOTP } from "../../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (!result.error) {
      navigate("/");
    }
  };

  const handleSendOTP = async () => {
    if (mobile.length === 10) {
      await dispatch(sendOTP(mobile));
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const result = await dispatch(verifyOTP({ mobile, otp }));
    if (!result.error) {
      navigate("/");
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "email" ? "otp" : "email");
    setOtpSent(false);
    setOtp("");
    dispatch(clearError());
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <header className="navbar-custom shadow">
        <div className="container py-2">
          <div className="d-flex align-items-center py-2">
            <Link to="/" className="text-decoration-none">
              <span className="logo-text d-block">MobileStore</span>
              <span className="logo-subtext">Explore <span className="text-warning">Plus</span></span>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="bg-white rounded shadow-sm p-4 w-100" style={{ maxWidth: "400px" }}>
          <h5 className="fw-medium mb-4">Sign In</h5>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="form-control py-2"
                placeholder="Email"
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChange}
                required
                className="form-control py-2"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-link position-absolute text-decoration-none"
                style={{ right: "10px", top: "50%", transform: "translateY(-50%)", color: "#2874f0" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-muted small my-3">
              By continuing, you agree to MobileStore's <span className="text-primary">Terms of Use</span> and <span className="text-primary">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary-custom w-100 py-2"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-primary text-decoration-none fw-medium small">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={toggleLoginMethod}
              className="btn btn-link text-decoration-none"
            >
              {loginMethod === "email" ? "Use Mobile OTP" : "Use Email/Password"}
            </button>
          </div>

          {loginMethod === "otp" && (
            <div className="mt-3 pt-3 border-top">
              <h6 className="mb-3">Login with Mobile OTP</h6>
              <form onSubmit={handleVerifyOTP}>
                {!otpSent ? (
                  <>
                    <div className="mb-3">
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        maxLength={10}
                        required
                        className="form-control py-2"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={loading || mobile.length !== 10}
                      className="btn btn-primary-custom w-100 py-2"
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                        className="form-control py-2"
                        placeholder="Enter OTP"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="btn btn-primary-custom w-100 py-2"
                    >
                      {loading ? "Verifying..." : "Verify & Login"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="btn btn-link w-100 mt-2"
                    >
                      Change Mobile Number
                    </button>
                  </>
                )}
              </form>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-muted small mb-3">Have an account?</p>
            <Link 
              to="/register" 
              className="btn btn-outline-primary w-100"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-light text-center py-3">
        <div className="d-flex flex-wrap justify-content-center gap-3 small text-muted">
          <span style={{ cursor: "pointer", color: "#2874f0" }}>Become a Seller</span>
          <span className="text-muted">|</span>
          <span style={{ cursor: "pointer", color: "#2874f0" }}>Advertise</span>
          <span className="text-muted">|</span>
          <span style={{ cursor: "pointer", color: "#2874f0" }}>Gift Cards</span>
          <span className="text-muted">|</span>
          <span style={{ cursor: "pointer", color: "#2874f0" }}>Help Center</span>
          <span className="text-muted">|</span>
          <span>© 2007-2024 MobileStore.com</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
