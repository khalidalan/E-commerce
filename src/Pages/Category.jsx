import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import allProducts from "../components/AllProducts1";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { useTranslation } from 'react-i18next';

function CategoryPage() {
  const { t } = useTranslation();
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timer);
  }, [categoryName]);

  const filteredProducts = useMemo(() => {
    if (!categoryName || !allProducts) return [];

    return allProducts.filter((product) => {
      if (product.category) {
        return product.category.toLowerCase() === categoryName.toLowerCase();
      }

      const productName = product.name?.toLowerCase() || "";
      const category = categoryName.toLowerCase();

      if (category === "clothes" || category === "clothing") {
        return (
          productName.includes("coat") ||
          productName.includes("shirt") ||
          productName.includes("jacket")
        );
      }
      if (category === "bags" || category === "accessories") {
        return productName.includes("bag") || productName.includes("handbag");
      }
      if (category === "electronics") {
        return (
          productName.includes("phone") ||
          productName.includes("laptop") ||
          productName.includes("headphone")
        );
      }

      return false;
    });
  }, [categoryName, allProducts]);

  const sortedProducts = useMemo(() => {
    let products = [...filteredProducts];

    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price);
      case "price-high":
        return products.sort((a, b) => b.price - a.price);
      case "name":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);

  const finalProducts = useMemo(() => {
    if (priceRange === "all") return sortedProducts;

    return sortedProducts.filter((product) => {
      switch (priceRange) {
        case "0-50":
          return product.price <= 50;
        case "50-100":
          return product.price > 50 && product.price <= 100;
        case "100-200":
          return product.price > 100 && product.price <= 200;
        case "200+":
          return product.price > 200;
        default:
          return true;
      }
    });
  }, [sortedProducts, priceRange]);

  if (loading) {
    return (
      <>
        <TopHeader />
        <Header />
        <div className="container mx-auto px-4 py-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-80 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopHeader />
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 capitalize text-gray-800">
              {t('categoryPage.title', { category: categoryName })}
            </h1>
            <p className="text-gray-600">
              {t('categoryPage.foundProducts', { count: finalProducts.length })}
            </p>
          </div>

          {filteredProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">{t('categoryPage.sortBy')}</option>
                <option value="price-low">{t('categoryPage.priceLowHigh')}</option>
                <option value="price-high">{t('categoryPage.priceHighLow')}</option>
                <option value="name">{t('categoryPage.nameAZ')}</option>
                <option value="rating">{t('categoryPage.rating')}</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('categoryPage.allPrices')}</option>
                <option value="0-50">{t('categoryPage.under50')}</option>
                <option value="50-100">{t('categoryPage.between50And100')}</option>
                <option value="100-200">{t('categoryPage.between100And200')}</option>
                <option value="200+">{t('categoryPage.over200')}</option>
              </select>
            </div>
          )}
        </div>

        {finalProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {t('categoryPage.noProducts')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('categoryPage.tryOther')}
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {t('categoryPage.browseAll')}
            </button>
          </div>
        ) : (
          <Cards products={finalProducts} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;