import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TeamSlider = () => {
  const teamMembers = [
    {
      id: 1,
      name: "keanu reeves",
      position: "Founder & Chairman",
      image:
        "/person.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        email: "tom@company.com",
      },
    },
    {
      id: 2,
      name: "robert downey jr",
      position: "Managing Director",
      image:
        "/person1.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        email: "emma@company.com",
      },
    },
    {
      id: 3,
      name: "Will Smith",
      position: "Product Designer",
      image:
        "/person2.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        email: "will@company.com",
      },
    },
    {
      id: 4,
      name: "Ben Affleck",
      position: "Marketing Lead",
      image:
        "/person3.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        email: "sarah@company.com",
      },
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "Tech Director",
      image:
       "/person4.webp",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
        email: "michael@company.com",
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 " dir="ltr">
      <div className="text-center mb-12">
       
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-blue-500",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-blue-600",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="team-swiper"
      >
        {teamMembers.map((member) => (
          <SwiperSlide key={member.id}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4 font-medium">
                  {member.position}
                </p>

                <div className="flex justify-center space-x-3">
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={member.social.instagram}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     

      <style jsx>{`
        .team-swiper .swiper-pagination {
          position: static !important;
          margin-top: 2rem;
        }

        .team-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .team-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2);
        }

        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 18px !important;
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
};

export default TeamSlider;
