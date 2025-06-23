import React, { useState } from "react";
import { Phone, Mail } from "lucide-react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formbold.com/s/obDA8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        await Swal.fire({
          title: t('contact.successTitle'),
          text: t('contact.successMessage'),
          icon: 'success',
          confirmButtonText: t('contact.buttonText'),
          confirmButtonColor: '#2563eb',
          timer: 3000,
          timerProgressBar: true,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      
      await Swal.fire({
        title: t('contact.errorTitle'),
        text: t('contact.errorMessage'),
        icon: 'error',
        confirmButtonText: t('contact.buttonText'),
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen " >
      <TopHeader />
      <Header />

      <div className="mt-20"></div>
      <div className="" >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-800 transition-colors">
              {t('contact.breadcrumbHome')}
            </a>
            <span>/</span>
            <span className="text-gray-800 font-medium">{t('contact.breadcrumbContact')}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12" dir="ltr">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {t('contact.callToUs')}
                </h3>
              </div>

              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  {t('contact.callDesc')}
                </p>
                <p className="font-medium">{t('contact.phone')}: +8801611112222</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {t('contact.writeToUs')}
                </h3>
              </div>

              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  {t('contact.writeDesc')}
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t('contact.email')}:</span>{" "}
                    {t('contact.emailCustomer')}
                  </p>
                  <p>
                    <span className="font-medium">{t('contact.email')}:</span>{" "}
                    {t('contact.emailSupport')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={t('contact.yourName')}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t('contact.yourEmail')}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('contact.yourPhone')}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder={t('contact.yourMessage')}
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={8}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 resize-none transition-all duration-200 disabled:opacity-50"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mb-20"></div>

      <Footer />
    </div>
  );
};

export default ContactPage;