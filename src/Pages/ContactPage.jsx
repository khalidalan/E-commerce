import React, { useState } from "react";
import { Phone, Mail } from "lucide-react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Message sent successfully!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen ">


      <TopHeader />
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="mt-20"></div>
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-800 transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-gray-800 font-medium">Contact</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Information */}
          <div className="space-y-8">
            {/* Call To Us Section */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Call To Us
                </h3>
              </div>

              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="font-medium">Phone: +8801611112222</p>
              </div>
            </div>

            {/* Write To Us Section */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Write To Us
                </h3>
              </div>

              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Emails:</span>{" "}
                    customer@exclusive.com
                  </p>
                  <p>
                    <span className="font-medium">Emails:</span>{" "}
                    support@exclusive.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="space-y-6">
              {/* Top Row - Name, Email, Phone */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 resize-none transition-all duration-200"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20"></div>


      <Footer />
    </div>
  );
};

export default ContactPage;
