import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setSuccess(false);

    try {
      const user = await login(email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/account", { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Welcome Back</h3>
                <p className="text-muted">Sign in to your account</p>
              </div>

              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError("")}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {success && (
                <div className="alert alert-success py-2 text-center mb-3">
                  ✅ Login Successful! Redirecting...
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control form-control-lg ${
                      email && !/\S+@\S+\.\S+/.test(email)
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={isLoading}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email.
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary fw-medium text-decoration-none"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>

            <div className="text-center mt-3">
              <small className="text-muted">
                &copy; {new Date().getFullYear()} AccountMgr. All rights
                reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
