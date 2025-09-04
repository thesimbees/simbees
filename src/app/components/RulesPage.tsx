'use client';

interface RulesPageProps {
  onBack: () => void;
}

export default function RulesPage({ onBack }: RulesPageProps) {
  return (
    <div className="min-h-screen bg-simbees-light-gray p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-simbees-primary text-simbees-black rounded-xl hover:bg-simbees-honey transition-colors font-semibold shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Simulation
          </button>
          <h1 className="text-4xl font-bold text-simbees-black">Simbees Business Simulation Guide</h1>
          <div className="w-40"></div> {/* Spacer for centering */}
        </div>

        {/* Backstory */}
        <div className="bg-simbees-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-simbees-black mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            The Advanced Marketplace Challenge
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-simbees-charcoal leading-relaxed mb-4">
              Welcome to Simbees, the most sophisticated business simulation experience! Four elite corporations - 
              <strong className="text-simbees-black"> Nexus Dynamics, Vertex Solutions, Apex Industries, and Quantum Ventures</strong> - 
              compete in a complex marketplace with multiple customer segments and advanced business dynamics.
            </p>
            <p className="text-simbees-charcoal leading-relaxed mb-4">
              As CEO, you'll navigate the same challenges faced by Fortune 500 companies: strategic R&D investments, 
              production capacity planning, targeted marketing campaigns, competitive pricing strategies, and market 
              segmentation. Your decisions will impact product performance, brand awareness, customer satisfaction, 
              and competitive positioning.
            </p>
            <p className="text-simbees-charcoal leading-relaxed">
              This isn't just a game - it's a realistic business education platform inspired by professional marketplace 
              simulations used in top MBA programs. Master the art of strategic business management and build your empire!
            </p>
          </div>
        </div>

        {/* Strategic Decision Variables */}
        <div className="bg-simbees-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-simbees-black mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Strategic Decision Variables
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                R&D Investment
              </h3>
              <p className="text-blue-700 text-sm mb-2">$0 - $200,000</p>
              <p className="text-blue-600 text-xs">Improves product performance, customer satisfaction, and competitive positioning. Higher investment = better products.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Production Capacity
              </h3>
              <p className="text-green-700 text-sm mb-2">5,000 - 50,000 units</p>
              <p className="text-green-600 text-xs">Maximum units you can manufacture. Higher capacity enables more sales but increases fixed costs and complexity.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Marketing Budget
              </h3>
              <p className="text-purple-700 text-sm mb-2">$0 - $300,000</p>
              <p className="text-purple-600 text-xs">Increases brand awareness and market penetration. Higher spend reaches more customers with diminishing returns.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Unit Price
              </h3>
              <p className="text-orange-700 text-sm mb-2">$20 - $150</p>
              <p className="text-orange-600 text-xs">Price per unit sold. Lower prices attract more customers but reduce profit margins. Find the optimal balance.</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 md:col-span-2 lg:col-span-1">
              <h3 className="font-bold text-red-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Target Market Segment
              </h3>
              <p className="text-red-700 text-sm mb-2">Budget | Mainstream | Premium</p>
              <p className="text-red-600 text-xs">Focus marketing efforts on specific customer segments with different preferences and buying behaviors.</p>
            </div>
          </div>
        </div>

        {/* Market Segments */}
        <div className="bg-simbees-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-simbees-black mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Market Segmentation
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-800 mb-4 text-xl">💰 Budget Conscious</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Market Size:</span>
                  <span className="font-semibold">50,000 customers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Price Sensitivity:</span>
                  <span className="font-semibold text-red-600">Very High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Quality Focus:</span>
                  <span className="font-semibold">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Brand Importance:</span>
                  <span className="font-semibold">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Growth Rate:</span>
                  <span className="font-semibold text-blue-600">3%/round</span>
                </div>
              </div>
              <p className="text-green-600 text-xs mt-3">Customers who prioritize low prices above all else. Compete on cost efficiency.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-4 text-xl">🎯 Mainstream Market</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Market Size:</span>
                  <span className="font-semibold">75,000 customers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Price Sensitivity:</span>
                  <span className="font-semibold text-orange-600">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Quality Focus:</span>
                  <span className="font-semibold">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Brand Importance:</span>
                  <span className="font-semibold">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Growth Rate:</span>
                  <span className="font-semibold text-blue-600">5%/round</span>
                </div>
              </div>
              <p className="text-blue-600 text-xs mt-3">Balanced customers seeking good value. Focus on overall competitiveness.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-4 text-xl">👑 Premium Segment</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Market Size:</span>
                  <span className="font-semibold">25,000 customers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Price Sensitivity:</span>
                  <span className="font-semibold text-green-600">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Quality Focus:</span>
                  <span className="font-semibold text-red-600">Very High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Brand Importance:</span>
                  <span className="font-semibold text-red-600">Very High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Growth Rate:</span>
                  <span className="font-semibold text-blue-600">8%/round</span>
                </div>
              </div>
              <p className="text-purple-600 text-xs mt-3">Quality-focused customers willing to pay premium prices. Invest in R&D and marketing.</p>
            </div>
          </div>
        </div>

        {/* Advanced Business Mechanics */}
        <div className="bg-simbees-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-simbees-black mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Advanced Business Mechanics
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-simbees-light-gray rounded-xl p-6">
              <h3 className="text-xl font-bold text-simbees-black mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Competitive Dynamics
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-simbees-white rounded-lg p-3">
                  <strong className="text-simbees-black">Market Share Calculation:</strong>
                  <p className="text-simbees-charcoal mt-1">Based on units sold across all segments relative to total market sales</p>
                </div>
                <div className="bg-simbees-white rounded-lg p-3">
                  <strong className="text-simbees-black">Competitive Position:</strong>
                  <p className="text-simbees-charcoal mt-1">Weighted score considering product performance, brand awareness, and market presence</p>
                </div>
                <div className="bg-simbees-white rounded-lg p-3">
                  <strong className="text-simbees-black">Customer Satisfaction:</strong>
                  <p className="text-simbees-charcoal mt-1">Influenced by product quality, price value, and brand reputation</p>
                </div>
              </div>
            </div>

            <div className="bg-simbees-light-gray rounded-xl p-6">
              <h3 className="text-xl font-bold text-simbees-black mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Financial Calculations
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-simbees-white rounded-lg p-3">
                  <strong className="text-simbees-black">Revenue:</strong>
                  <p className="text-simbees-charcoal mt-1">Sum of (Units Sold × Price) across all market segments</p>
                </div>
                <div className="bg-simbees-white rounded-lg p-3">
                  <strong className="text-simbees-black">Total Costs:</strong>
                  <p className="text-simbees-charcoal mt-1">Production + Marketing + R&D costs with capacity utilization effects</p>
                </div>
                <div className="bg-simbees-white rounded-lg p-3">
                  <strong className="text-simbees-black">Net Profit:</strong>
                  <p className="text-simbees-charcoal mt-1">Revenue minus all costs, the primary performance metric</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Guide */}
        <div className="bg-simbees-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-simbees-black mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Winning Strategies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-simbees-black mb-4">Strategic Approaches</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-lg p-3">
                  <h4 className="font-bold text-green-800">💰 Cost Leadership</h4>
                  <p className="text-green-700 text-sm">Target budget segment with high capacity, low prices, minimal R&D</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-lg p-3">
                  <h4 className="font-bold text-purple-800">👑 Premium Differentiation</h4>
                  <p className="text-purple-700 text-sm">Heavy R&D investment, premium pricing, strong brand marketing</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-lg p-3">
                  <h4 className="font-bold text-blue-800">🎯 Focused Strategy</h4>
                  <p className="text-blue-700 text-sm">Dominate one segment with tailored product and marketing approach</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 rounded-r-lg p-3">
                  <h4 className="font-bold text-orange-800">⚖️ Balanced Growth</h4>
                  <p className="text-orange-700 text-sm">Moderate investments across all areas for steady market presence</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-simbees-black mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <span className="font-medium text-green-800">💰 Net Profit</span>
                  <span className="font-bold text-green-600">35% Weight</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <span className="font-medium text-blue-800">📈 Market Share</span>
                  <span className="font-bold text-blue-600">25% Weight</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <span className="font-medium text-purple-800">🏆 Competitive Position</span>
                  <span className="font-bold text-purple-600">25% Weight</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <span className="font-medium text-orange-800">⚡ Efficiency Ratio</span>
                  <span className="font-bold text-orange-600">15% Weight</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-r from-simbees-honey to-simbees-orange rounded-2xl shadow-xl p-8 text-simbees-black">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Master-Level Strategy Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-simbees-black bg-opacity-20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-simbees-black rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Monitor Competitive Intelligence</p>
                  <p className="text-sm opacity-90">Analyze competitor decisions and adapt your strategy accordingly</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-simbees-black bg-opacity-20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-simbees-black rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Segment-Specific Targeting</p>
                  <p className="text-sm opacity-90">Align your decisions with your target segment's preferences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-simbees-black bg-opacity-20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-simbees-black rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">R&D Investment Timing</p>
                  <p className="text-sm opacity-90">Early R&D investments compound over multiple rounds</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-simbees-black bg-opacity-20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-simbees-black rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Capacity Utilization</p>
                  <p className="text-sm opacity-90">Optimize production capacity to avoid waste or lost sales</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-simbees-black bg-opacity-20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-simbees-black rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Marketing ROI</p>
                  <p className="text-sm opacity-90">Track marketing effectiveness and adjust spend for optimal returns</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-simbees-black bg-opacity-20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-simbees-black rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Long-term Vision</p>
                  <p className="text-sm opacity-90">Balance short-term profits with sustainable competitive advantage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
