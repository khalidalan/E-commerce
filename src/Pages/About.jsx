import Advantages from "../components/Advantages";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";
import Team from "../components/Team";
import { Grid, DollarSign, BarChart3, TrendingUp } from "lucide-react";
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  
  const metrics = [
    {
      id: 1,
      value: "10.5k",
      label: t('about.metrics.sellers'),
      icon: Grid,
      bgColor: "bg-white",
      iconBg: "bg-gray-900",
    },
    {
      id: 2,
      value: "33k",
      label: t('about.metrics.monthlySales'),
      icon: DollarSign,
      bgColor: "bg-red-500",
      iconBg: "bg-white",
      textColor: "text-white",
    },
    {
      id: 3,
      value: "45.5k",
      label: t('about.metrics.customers'),
      icon: BarChart3,
      bgColor: "bg-white",
      iconBg: "bg-gray-900",
    },
    {
      id: 4,
      value: "25k",
      label: t('about.metrics.annualSales'),
      icon: TrendingUp,
      bgColor: "bg-white",
      iconBg: "bg-gray-900",
    },
  ];

  return (
    <div>
      <TopHeader />
      <Header />
      <div className="xl:pt-0 pt-20"></div>

      <div className="container flex flex-col py-20">
        <nav className="flex text-sm text-gray-600 mb-8">
          <span className="hover:text-blue-600 cursor-pointer">
            {t('about.breadcrumbHome')}
          </span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">
            {t('about.breadcrumbAbout')}
          </span>
        </nav>

        <div className="flex xl:flex-row flex-col gap-10">
          <div className="flex flex-col justify-center">
            <h1 className="font-semibold text-5xl inter">
              {t('about.title')}
            </h1>
            <p className="mt-10 max-w-[525px]">
              {t('about.paragraph1')}
            </p>

            <p className="mt-6">
              {t('about.paragraph2')}
            </p>
          </div>

          <div className="w-full">
            <img className="" src="/Side Image.svg" alt="" />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 p-8 mt-20 justify-center">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={metric.id}
                className={`${metric.bgColor} rounded-lg border border-gray-200 p-8 flex-1 min-w-64 max-w-80 shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`${metric.iconBg} rounded-full p-4 flex items-center justify-center`}
                  >
                    <IconComponent
                      size={32}
                      className={
                        metric.textColor === "text-white"
                          ? "text-red-500"
                          : "text-white"
                      }
                    />
                  </div>

                  <div
                    className={`text-4xl font-bold ${
                      metric.textColor || "text-gray-900"
                    }`}
                  >
                    {metric.value}
                  </div>

                  <div
                    className={`text-sm font-medium ${
                      metric.textColor || "text-gray-600"
                    } max-w-48 leading-relaxed`}
                  >
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Team />
      <Advantages />
      <div className="pt-20"></div>
      <Footer />
    </div>
  );
}

export default About;