import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError("All fields are required");
    }

    try {
      setError("");
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setError("Failed to log in: " + error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google: " + error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <TopHeader />
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {t("auth.loginToExclusive")}
              </h2>
              <p className="text-gray-600 text-sm">{t("auth.enterDetails")}</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={t("auth.emailOrPhone")}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder={t("auth.password")}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-blue-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 text-sm"
                >
                  {loading ? t("auth.logIn") : t("auth.logIn")}
                </button>

                <Link
                  to="/forgot-password"
                  className="text-blue-500 hover:text-blue-600 text-sm text-center"
                >
                  {t("auth.forgetPassword")}
                </Link>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("auth.or")}
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>{t("auth.signInGoogle")}</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs sm:text-sm text-gray-600">
              {t("auth.dontHaveAccount")}{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t("auth.signUp")}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
