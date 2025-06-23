// src/components/Account/Account.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function Account() {
  const { t } = useTranslation();
  const { currentUser, logout, changePassword, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: currentUser?.displayName?.split(" ")[0] || "",
    lastName: currentUser?.displayName?.split(" ")[1] || "",
    email: currentUser?.email || "",
    address: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${editForm.firstName} ${editForm.lastName}`.trim();

    try {
      await updateUserProfile(fullName);

      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: t('profile.updateSuccess'),
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      Swal.fire({
        icon: "error",
        title: t('profile.updateError'),
        text: error.message || t('profile.somethingWentWrong'),
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: t('profile.passwordMismatch'),
        text: t('profile.passwordMismatchMessage'),
      });
      return;
    }

    try {
      await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      Swal.fire({
        icon: "success",
        title: t('profile.passwordChangeSuccess'),
        showConfirmButton: false,
        timer: 2000,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Failed to change password:", error);

      let message = t('profile.passwordChangeError');

      if (error.code === "auth/wrong-password") {
        message = t('profile.incorrectPassword');
      } else if (error.code === "auth/weak-password") {
        message = t('profile.weakPassword');
      } else {
        message = error.message;
      }

      Swal.fire({
        icon: "error",
        title: t('profile.passwordChangeError'),
        text: message,
      });
    }
  };

  const renderProfileSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-blue-500">
          {t('profile.editProfile')}
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {t('profile.editProfile')}
          </button>
        )}
      </div>

      <form onSubmit={handleEditSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('profile.firstName')}
            </label>
            <input
              type="text"
              value={editForm.firstName}
              onChange={(e) =>
                setEditForm({ ...editForm, firstName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-md bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('profile.lastName')}
            </label>
            <input
              type="text"
              value={editForm.lastName}
              onChange={(e) =>
                setEditForm({ ...editForm, lastName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-md bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('profile.email')}
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-md bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('profile.address')}
            </label>
            <input
              type="text"
              value={editForm.address}
              onChange={(e) =>
                setEditForm({ ...editForm, address: e.target.value })
              }
              disabled={!isEditing}
              placeholder="Kingston, 5236, United State"
              className="w-full p-3 border border-gray-300 rounded-md bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('profile.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {t('profile.saveChanges')}
            </button>
          </div>
        )}
      </form>
    </div>
  );

  const renderPasswordSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        {t('profile.passwordChanges')}
      </h3>

      <form onSubmit={handlePasswordSubmit}>
        <div className="space-y-4 mb-6">
          <div>
            <input
              type="password"
              placeholder={t('profile.currentPassword')}
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder={t('profile.newPassword')}
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder={t('profile.confirmPassword')}
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() =>
              setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
            className="px-6 py-2 text-gray-700 hover:text-gray-900"
          >
            {t('profile.cancel')}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {t('profile.saveChanges')}
          </button>
        </div>
      </form>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">
        {t('profile.myOrders')}
      </h2>
      <div className="text-center py-12">
        <img
          src="/icons/empty-orders.svg"
          alt={t('profile.noOrders')}
          className="w-24 h-24 mx-auto mb-4 opacity-50"
        />
        <p className="text-gray-500">{t('profile.noOrdersMessage')}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {t('profile.startShopping')}
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            {renderProfileSection()}
            {renderPasswordSection()}
          </>
        );
      case "orders":
        return renderOrdersSection();
      case "cancellations":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              {t('profile.myCancellations')}
            </h2>
            <div className="text-center py-12">
              <p className="text-gray-500">{t('profile.noCancellations')}</p>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              {t('profile.myReviews')}
            </h2>
            <div className="text-center py-12">
              <p className="text-gray-500">
                {t('profile.noReviews')}
              </p>
            </div>
          </div>
        );
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="text-sm">
            <span className="text-gray-500">{t('navigation.home')}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{t('profile.manageAccount')}</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">
                  {t('profile.manageAccount')}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`block w-full text-left pl-4 py-1 ${
                        activeTab === "profile"
                          ? "text-blue-500"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {t('profile.myProfile')}
                    </button>
                  </li>
                  <li>
                    <button className="block w-full text-left pl-4 py-1 text-gray-600 hover:text-gray-900">
                      {t('profile.addressBook')}
                    </button>
                  </li>
                  <li>
                    <button className="block w-full text-left pl-4 py-1 text-gray-600 hover:text-gray-900">
                      {t('profile.paymentOptions')}
                    </button>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`block w-full text-left font-medium mb-2 ${
                    activeTab === "orders"
                      ? "text-blue-500"
                      : "text-gray-900 hover:text-blue-500"
                  }`}
                >
                  {t('profile.myOrders')}
                </button>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button
                      onClick={() => setActiveTab("cancellations")}
                      className={`block w-full text-left pl-4 py-1 ${
                        activeTab === "cancellations"
                          ? "text-blue-500"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {t('profile.myCancellations')}
                    </button>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`block w-full text-left font-medium ${
                    activeTab === "reviews"
                      ? "text-blue-500"
                      : "text-gray-900 hover:text-blue-500"
                  }`}
                >
                  {t('profile.myReviews')}
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left font-medium text-gray-900 hover:text-blue-500 pt-4 border-t border-gray-200"
              >
                {t('profile.logout')}
              </button>
            </div>
          </div>

          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;