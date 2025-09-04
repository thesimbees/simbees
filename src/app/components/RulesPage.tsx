'use client';

interface RulesPageProps {
  onBack: () => void;
}

export default function RulesPage({ onBack }: RulesPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Game
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Game Rules & Strategy Guide</h1>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Backstory */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            🏢 The Corporate Challenge
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to the most intense business competition of the year! Four ambitious corporations have entered 
              the market to compete for dominance in the emerging tech gadget industry. Each company must make 
              strategic decisions about production, marketing, and pricing to maximize their market position.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              As the CEO of your corporation, you'll face the same challenges real businesses encounter: balancing 
              production costs with market demand, investing in marketing to build brand awareness, and setting 
              prices that attract customers while maintaining profitability.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The market is unforgiving - make smart decisions and your company will thrive. Make poor choices, 
              and watch your competitors capture market share while your profits dwindle. Do you have what it 
              takes to build a business empire?
            </p>
          </div>
        </div>

        {/* Game Mechanics */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              ⚙️ How to Play
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-gray-800">1. Strategic Planning</h4>
                <p className="text-gray-600">Each round, make three critical business decisions for your company.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-gray-800">2. Market Competition</h4>
                <p className="text-gray-600">All companies compete simultaneously in the same market.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-gray-800">3. Performance Analysis</h4>
                <p className="text-gray-600">Review detailed results and rankings after each round.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-bold text-gray-800">4. Long-term Success</h4>
                <p className="text-gray-600">Build cumulative profit and market share over multiple rounds.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              📊 Key Decisions
            </h3>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">🏭 Production Lines (1-10)</h4>
                <p className="text-red-700 text-sm">Determines your manufacturing capacity and unit costs. More lines = higher capacity but higher fixed costs.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2">📢 Marketing Spend ($)</h4>
                <p className="text-blue-700 text-sm">Investment in advertising and promotion. Higher spend generates more demand with diminishing returns.</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">💰 Unit Price ($)</h4>
                <p className="text-green-700 text-sm">Price per product sold. Lower prices attract more customers but reduce profit margins.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Logic */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            🧮 Calculation Engine
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Production & Costs</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><strong>Production Capacity:</strong></div>
                <div className="text-blue-600">Lines × 1,000 units</div>
                
                <div className="mt-3"><strong>Production Cost per Unit:</strong></div>
                <div className="text-blue-600">max(1, 10 - Lines × 0.5)</div>
                <div className="text-gray-600 text-xs">• Economies of scale reduce unit costs</div>
                
                <div className="mt-3"><strong>Fixed Production Costs:</strong></div>
                <div className="text-blue-600">Lines × $5,000</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Market Dynamics</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><strong>Marketing Effectiveness:</strong></div>
                <div className="text-green-600">√(Marketing Spend ÷ 1,000)</div>
                <div className="text-gray-600 text-xs">• Diminishing returns on marketing</div>
                
                <div className="mt-3"><strong>Price Attractiveness:</strong></div>
                <div className="text-green-600">max(0.1, 50 ÷ Unit Price)</div>
                <div className="text-gray-600 text-xs">• Lower prices = higher demand</div>
                
                <div className="mt-3"><strong>Demand Generated:</strong></div>
                <div className="text-green-600">10,000 × Marketing × Price ÷ 100</div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Final Calculations</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-bold text-purple-800 mb-2">Units Sold</h4>
                <div className="font-mono text-sm text-purple-700">min(Capacity, Demand)</div>
                <p className="text-xs text-purple-600 mt-1">Limited by production capacity</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-bold text-orange-800 mb-2">Revenue</h4>
                <div className="font-mono text-sm text-orange-700">Units Sold × Unit Price</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">Profit</h4>
                <div className="font-mono text-sm text-red-700">Revenue - Total Costs</div>
                <p className="text-xs text-red-600 mt-1">Production + Marketing costs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring System */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            🏆 Scoring & Rankings
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">💰 Profit</span>
                  <span className="font-bold text-green-600">40% Weight</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">📈 Market Share</span>
                  <span className="font-bold text-blue-600">30% Weight</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-800">💵 Revenue</span>
                  <span className="font-bold text-purple-600">20% Weight</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-800">⚡ Efficiency</span>
                  <span className="font-bold text-orange-600">10% Weight</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Winning Strategies</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-gray-800">High Volume Strategy</h4>
                  <p className="text-gray-600 text-sm">Many production lines + low prices = market dominance</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800">Premium Strategy</h4>
                  <p className="text-gray-600 text-sm">High prices + heavy marketing = luxury positioning</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-gray-800">Balanced Approach</h4>
                  <p className="text-gray-600 text-sm">Moderate investments across all areas for steady growth</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold text-gray-800">Efficiency Focus</h4>
                  <p className="text-gray-600 text-sm">Optimize production costs while maintaining quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            💡 Pro Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Watch your competitors' strategies and adapt accordingly</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Balance short-term profits with long-term market position</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Marketing has diminishing returns - don't overspend</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>More production lines reduce unit costs significantly</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Price wars can hurt everyone's profitability</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Study the detailed calculations to optimize your strategy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
