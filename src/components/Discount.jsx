import Timer2 from "./Timer2";

function Discount() {
  return (
    <>
      {/* Custom CSS for screens smaller than 400px */}
      <style jsx>{`
        @media (max-width: 399px) {
          .ultra-small-screen {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          
          .ultra-small-title {
            font-size: 2rem !important;
            line-height: 1.1 !important;
          }
          
          .ultra-small-text {
            font-size: 1rem !important;
          }
          
          .ultra-small-timer {
            padding: 16px !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .ultra-small-button {
            padding: 12px 20px !important;
            font-size: 0.9rem !important;
          }
          
          .ultra-small-product {
            padding: 20px !important;
            min-height: 250px !important;
          }
          
          .ultra-small-img {
            max-width: 200px !important;
          }
          
          .ultra-small-gap {
            gap: 16px !important;
          }
          
          .ultra-small-py {
            padding-top: 24px !important;
            padding-bottom: 24px !important;
          }
        }
      `}</style>
      
      <div className="relative w-full bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden mt-16 mb-16 xl:py-0 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 ultra-small-screen ultra-small-py">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ultra-small-gap">
            
            {/* Content Section */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-block">
                <span className="bg-green-400/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-green-400/30">
                  🎵 Limited Time Offer
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight ultra-small-title">
                Enhance Your
                <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Music Experience
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 ultra-small-text">
                Premium sound quality that transforms every beat into an unforgettable moment
              </p>
              
              {/* Timer */}
              <div className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 max-w-md mx-auto lg:mx-0 ultra-small-timer">
                <Timer2 />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group relative bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-4 px-8 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/50 active:scale-95 ultra-small-button">
                  <span className="relative z-10">🛒 Buy Now - 50% OFF</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
            
            {/* Product Showcase */}
            <div className="relative order-1 lg:order-2">
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-bounce delay-500"></div>
              
              {/* Main Product Container */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 shadow-2xl ultra-small-product">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/5 rounded-3xl"></div>
                
                {/* Product Image */}
                <div className="relative z-10 flex justify-center items-center min-h-[300px] sm:min-h-[400px] ultra-small-product">
                  <img
                    className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] h-auto object-contain filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 ultra-small-img"
                    src="/public/JBL_BOOMBOX.png"
                    alt="JBL Boombox Premium Speaker"
                  />
                </div>
                
                {/* Product Info Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  -50%
                </div>
                
                {/* Sound Waves Animation */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-32 h-32 border-2 border-green-400/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-4 border-2 border-green-400/20 rounded-full animate-ping delay-300"></div>
                  <div className="absolute inset-8 border-2 border-green-400/10 rounded-full animate-ping delay-700"></div>
                </div>
              </div>
              
              {/* Floating Specs */}
              <div className="absolute -left-4 top-1/4 bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-xl p-3 text-white text-sm transform -rotate-6 hidden lg:block">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Bass Boost</span>
                </div>
              </div>
              
              <div className="absolute -right-4 bottom-1/4 bg-black/80 backdrop-blur-sm border border-blue-400/30 rounded-xl p-3 text-white text-sm transform rotate-6 hidden lg:block">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>360° Sound</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Discount;