import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError(t("forgotPassword.errorEmailRequired"));
    }

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage(t("forgotPassword.successMessage"));
    } catch (error) {
      setError(t("forgotPassword.errorMessage") + error.message);
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
                {t("forgotPassword.title")}
              </h2>
              <p className="text-gray-600 text-sm">
                {t("forgotPassword.description")}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4 text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 text-sm"
              >
                {loading
                  ? t("forgotPassword.sending")
                  : t("forgotPassword.button")}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                {t("forgotPassword.backToLogin")}
              </Link>
            </div>

            <p className="mt-8 text-center text-xs sm:text-sm text-gray-600">
              {t("forgotPassword.dontHaveAccount")}{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t("forgotPassword.signUp")}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ForgotPassword;
