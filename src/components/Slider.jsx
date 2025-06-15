// components/PromoSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    title: "Premium Collection",
    offer: "Up to 40% off Smart Watches",
    subtitle: "Limited Time Offer",
    button: "Shop Now",
    image: "/Watch.jpg",
    color: "from-blue-600 to-purple-700",
    badge: "HOT DEAL"
  },
  {
    id: 2,
    title: "Capture Moments",
    offer: "Professional Camera Sale",
    subtitle: "Starting from $299",
    button: "Explore",
    image: "/camera.jpg",
    color: "from-emerald-500 to-teal-600",
    badge: "NEW ARRIVAL"
  },
  {
    id: 3,
    title: "Audio Excellence",
    offer: "Premium Headphones Collection",
    subtitle: "Wireless & Noise Cancelling",
    button: "Listen Now",
    image: "/headPhone.jpg",
    color: "from-orange-500 to-red-600",
    badge: "BESTSELLER"
  },
];

export default function PromoSlider() {
  return (
    <div className="w-full max-w-screen-xl mx-auto py-6 px-2 sm:px-4">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100 !bg-white'
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80 hover:opacity-70 transition-opacity duration-500`} />
              
              {/* Dark Overlay for mobile */}
              <div className="absolute inset-0 bg-black/40 md:bg-black/20" />

              {/* Content Container */}
              <div className="relative z-10 flex items-center h-full px-4 sm:px-8 md:px-16 lg:px-20">
                <div className="text-white max-w-2xl">
                  {/* Badge */}
                  <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-4 border border-white/30">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    {slide.badge}
                  </div>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-lg md:text-xl font-medium mb-1 sm:mb-2 opacity-90">
                    {slide.subtitle}
                  </p>

                  {/* Main Title */}
                  <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-1 sm:mb-2">
                    {slide.title}
                  </h1>

                  {/* Offer */}
                  <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-8 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    {slide.offer}
                  </h2>

                  {/* CTA Button */}
                  <button className="group/btn inline-flex items-center gap-2 sm:gap-3 bg-white text-gray-900 px-4 sm:px-6 md:px-8 py-2.5 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-xl active:scale-95">
                    <span>{slide.button}</span>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  {/* Secondary Info */}
                  <p className="mt-3 sm:mt-6 text-xs sm:text-sm opacity-80 max-w-md">
                    *Limited time offer. Terms and conditions apply. Free shipping on orders over $50.
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-5 sm:top-10 right-5 sm:right-10 w-16 sm:w-32 h-16 sm:h-32 bg-white/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
              <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-14 sm:w-24 h-14 sm:h-24 bg-white/5 rounded-full blur-xl sm:blur-2xl animate-pulse delay-1000"></div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30">
          <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30">
          <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </Swiper>
    </div>
  );
}
