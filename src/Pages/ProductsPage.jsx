import { useState, useMemo } from "react";
import Cards from "../components/Cards";
import Cards2 from "../components/Cards2";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TopHeader from "../components/TopHeader";
import Products from "../components/AllProducts1"; 
import { useTranslation } from "react-i18next";

function ProductsPage() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return Products;
    
    return Products.filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesQuery;
    });
  }, [searchQuery]);

  const categoryFilteredProducts = useMemo(() => {
    if (categoryFilter === "all") return searchFilteredProducts;
    
    return searchFilteredProducts.filter(product => 
      product.category && product.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }, [searchFilteredProducts, categoryFilter]);

  const priceFilteredProducts = useMemo(() => {
    if (priceRange === "all") return categoryFilteredProducts;
    
    return categoryFilteredProducts.filter(product => {
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
  }, [categoryFilteredProducts, priceRange]);

  const finalProducts = useMemo(() => {
    let results = [...priceFilteredProducts];
    
    switch (sortBy) {
      case "price-low":
        return results.sort((a, b) => a.price - b.price);
      case "price-high":
        return results.sort((a, b) => b.price - a.price);
      case "name":
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
        return results.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case "default":
      default:
        return results;
    }
  }, [priceFilteredProducts, sortBy]);

  const availableCategories = useMemo(() => {
    const categories = Products
      .map(product => product.category)
      .filter(Boolean)
      .filter((category, index, arr) => arr.indexOf(category) === index);
    
    return categories;
  }, []);

  const clearAllFilters = () => {
    setCategoryFilter("all");
    setPriceRange("all");
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div>
      <TopHeader />
      <Header />
      <div className="container mx-auto px-4">
        <div className="text-center py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('productsPage.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            {t('productsPage.description')}
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          
          <div className="mt-6">
            <p className="text-gray-600">
              {t('productsPage.showing', { count: finalProducts.length, total: Products.length })}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder={t('productsPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {availableCategories.length > 0 && (
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{t('productsPage.allCategories')}</option>
                  {availableCategories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('productsPage.allPrices')}</option>
                <option value="0-50">{t('productsPage.under50')}</option>
                <option value="50-100">{t('productsPage.between50And100')}</option>
                <option value="100-200">{t('productsPage.between100And200')}</option>
                <option value="200+">{t('productsPage.over200')}</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">{t('productsPage.default')}</option>
                <option value="price-low">{t('productsPage.priceLowHigh')}</option>
                <option value="price-high">{t('productsPage.priceHighLow')}</option>
                <option value="name">{t('productsPage.nameAZ')}</option>
                <option value="rating">{t('productsPage.highestRated')}</option>
                <option value="newest">{t('productsPage.newestFirst')}</option>
              </select>
            </div>

            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-white transition-colors"
            >
              {t('productsPage.clearFilters')}
            </button>
          </div>
        </div>

        {finalProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {t('productsPage.notFoundTitle')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('productsPage.notFoundMessage')}
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {t('productsPage.clearAllFilters')}
            </button>
          </div>
        ) : (
          <Cards products={finalProducts} />
        )}
        
        <div className="mt-20"></div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;