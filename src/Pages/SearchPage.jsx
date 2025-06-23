import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import allProducts from "../components/AllProducts1";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { useTranslation } from 'react-i18next';

function SearchPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    return allProducts.filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()));
      
      return matchesQuery;
    });
  }, [query]);

  const categoryFilteredResults = useMemo(() => {
    if (categoryFilter === "all") return searchResults;
    
    return searchResults.filter(product => 
      product.category && product.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }, [searchResults, categoryFilter]);

  const priceFilteredResults = useMemo(() => {
    if (priceRange === "all") return categoryFilteredResults;
    
    return categoryFilteredResults.filter(product => {
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
  }, [categoryFilteredResults, priceRange]);

  const finalResults = useMemo(() => {
    let results = [...priceFilteredResults];
    
    switch (sortBy) {
      case "price-low":
        return results.sort((a, b) => a.price - b.price);
      case "price-high":
        return results.sort((a, b) => b.price - a.price);
      case "name":
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "relevance":
      default:
        return results.sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
          const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());
          
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return 0;
        });
    }
  }, [priceFilteredResults, sortBy, query]);

  const availableCategories = useMemo(() => {
    const categories = searchResults
      .map(product => product.category)
      .filter(Boolean)
      .filter((category, index, arr) => arr.indexOf(category) === index);
    
    return categories;
  }, [searchResults]);

  return (
    <>
      <TopHeader />
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t('searchPage.title')}
          </h1>
          <p className="text-gray-600">
            {query ? (
              t('searchPage.resultsFound', { 
                count: finalResults.length, 
                query: query 
              })
            ) : (
              t('searchPage.noQuery')
            )}
          </p>
        </div>

        {query && (
          <>
            {searchResults.length > 0 && (
              <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {availableCategories.length > 0 && (
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">{t('searchPage.allCategories')}</option>
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
                    <option value="all">{t('searchPage.allPrices')}</option>
                    <option value="0-50">{t('searchPage.under50')}</option>
                    <option value="50-100">{t('searchPage.between50And100')}</option>
                    <option value="100-200">{t('searchPage.between100And200')}</option>
                    <option value="200+">{t('searchPage.over200')}</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">{t('searchPage.relevance')}</option>
                    <option value="price-low">{t('searchPage.priceLowHigh')}</option>
                    <option value="price-high">{t('searchPage.priceHighLow')}</option>
                    <option value="name">{t('searchPage.nameAZ')}</option>
                    <option value="rating">{t('searchPage.rating')}</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setCategoryFilter("all");
                    setPriceRange("all");
                    setSortBy("relevance");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  {t('searchPage.clearFilters')}
                </button>
              </div>
            )}

            {finalResults.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {t('searchPage.noResultsTitle')}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t('searchPage.noResultsMessage')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    {t('searchPage.browseAll')}
                  </button>
                  <button
                    onClick={() => {
                      setCategoryFilter("all");
                      setPriceRange("all");
                      setSortBy("relevance");
                    }}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    {t('searchPage.clearAll')}
                  </button>
                </div>
              </div>
            ) : (
              <Cards products={finalResults} />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;