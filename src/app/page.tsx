'use client';

import { useState } from 'react';
import RulesPage from './components/RulesPage';

interface Team {
  id: number;
  name: string;
  color: string;
  totalProfit: number;
  totalMarketShare: number;
  currentDecision: BusinessDecision | null;
}

interface BusinessDecision {
  productionLines: number;
  marketingSpend: number;
  unitPrice: number;
}

interface BusinessResults {
  productionCapacity: number;
  productionCostPerUnit: number;
  marketingEffectiveness: number;
  demandGenerated: number;
  unitsSold: number;
  revenue: number;
  totalCosts: number;
  profit: number;
  marketShare: number;
}

interface Round {
  roundNumber: number;
  decisions: { [teamId: number]: BusinessDecision };
  results: { [teamId: number]: BusinessResults };
  rankings: { teamId: number; rank: number; score: number }[];
  calculation: string;
}

  // Team icon component using PNG alpha as a mask to tint only the factory shape
  const TeamIcon = ({ color, size = "w-8 h-8" }: { color: string; size?: string }) => {
    const colorMap: { [key: string]: string } = {
      'bg-red-500': '#ef4444',
      'bg-blue-500': '#3b82f6',
      'bg-green-500': '#22c55e',
      'bg-yellow-500': '#eab308'
    };

    const tint = colorMap[color] || '#64748b'; // default slate tint if missing

    return (
      <div
        className={`${size}`}
        style={{
          WebkitMaskImage: "url('/factory.png')",
          maskImage: "url('/factory.png')",
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          backgroundColor: tint,
          display: 'inline-block'
        }}
        aria-label="Factory icon"
      />
    );
  };

export default function BusinessSimulation() {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Red Corp', color: 'bg-red-500', totalProfit: 0, totalMarketShare: 0, currentDecision: null },
    { id: 2, name: 'Blue Industries', color: 'bg-blue-500', totalProfit: 0, totalMarketShare: 0, currentDecision: null },
    { id: 3, name: 'Green Enterprises', color: 'bg-green-500', totalProfit: 0, totalMarketShare: 0, currentDecision: null },
    { id: 4, name: 'Yellow Solutions', color: 'bg-yellow-500', totalProfit: 0, totalMarketShare: 0, currentDecision: null },
  ]);

  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [gamePhase, setGamePhase] = useState<'submission' | 'results'>('submission');
  const [inputValues, setInputValues] = useState<{ [teamId: number]: { productionLines: string; marketingSpend: string; unitPrice: string } }>({});
  const [showRules, setShowRules] = useState(false);

  const handleDecisionInput = (teamId: number, field: keyof BusinessDecision, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [teamId]: { ...prev[teamId], [field]: value }
    }));
  };

  const submitDecision = (teamId: number) => {
    const inputs = inputValues[teamId];
    if (!inputs) return;

    const productionLines = parseInt(inputs.productionLines);
    const marketingSpend = parseFloat(inputs.marketingSpend);
    const unitPrice = parseFloat(inputs.unitPrice);

    if (isNaN(productionLines) || isNaN(marketingSpend) || isNaN(unitPrice)) return;
    if (productionLines < 1 || marketingSpend < 0 || unitPrice <= 0) return;

    const decision: BusinessDecision = { productionLines, marketingSpend, unitPrice };

    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, currentDecision: decision } : team
    ));
    setInputValues(prev => ({ ...prev, [teamId]: { productionLines: '', marketingSpend: '', unitPrice: '' } }));
  };

  const calculateBusinessResults = (): { results: { [teamId: number]: BusinessResults }; calculation: string } => {
    const decisions = teams.reduce((acc, team) => {
      if (team.currentDecision) {
        acc[team.id] = team.currentDecision;
      }
      return acc;
    }, {} as { [teamId: number]: BusinessDecision });

    const results: { [teamId: number]: BusinessResults } = {};
    let calculation = "=== BUSINESS SIMULATION RESULTS ===\n\n";

    // Market constants
    const BASE_MARKET_SIZE = 10000;
    const FIXED_PRODUCTION_COST = 5000;
    const PRODUCTION_LINE_CAPACITY = 1000;

    // Calculate results for each team
    Object.entries(decisions).forEach(([teamIdStr, decision]) => {
      const teamId = parseInt(teamIdStr);
      const team = teams.find(t => t.id === teamId)!;
      
      // Production calculations
      const productionCapacity = decision.productionLines * PRODUCTION_LINE_CAPACITY;
      const productionCostPerUnit = Math.max(1, 10 - (decision.productionLines * 0.5)); // Economies of scale
      
      // Marketing effectiveness (diminishing returns)
      const marketingEffectiveness = Math.sqrt(decision.marketingSpend / 1000);
      
      // Demand calculation based on price and marketing
      const priceAttractiveness = Math.max(0.1, 50 / decision.unitPrice); // Lower price = higher demand
      const demandGenerated = Math.floor(BASE_MARKET_SIZE * marketingEffectiveness * priceAttractiveness / 100);
      
      // Units sold (limited by production capacity)
      const unitsSold = Math.min(productionCapacity, demandGenerated);
      
      // Financial calculations
      const revenue = unitsSold * decision.unitPrice;
      const productionCosts = unitsSold * productionCostPerUnit + (decision.productionLines * FIXED_PRODUCTION_COST);
      const totalCosts = productionCosts + decision.marketingSpend;
      const profit = revenue - totalCosts;

      results[teamId] = {
        productionCapacity,
        productionCostPerUnit,
        marketingEffectiveness,
        demandGenerated,
        unitsSold,
        revenue,
        totalCosts,
        profit,
        marketShare: 0 // Will be calculated after all teams
      };

      calculation += `${team.name}:\n`;
      calculation += `  Production Lines: ${decision.productionLines} (Capacity: ${productionCapacity} units)\n`;
      calculation += `  Production Cost/Unit: $${productionCostPerUnit.toFixed(2)}\n`;
      calculation += `  Marketing Spend: $${decision.marketingSpend.toLocaleString()}\n`;
      calculation += `  Unit Price: $${decision.unitPrice.toFixed(2)}\n`;
      calculation += `  Demand Generated: ${demandGenerated} units\n`;
      calculation += `  Units Sold: ${unitsSold} units\n`;
      calculation += `  Revenue: $${revenue.toLocaleString()}\n`;
      calculation += `  Total Costs: $${totalCosts.toLocaleString()}\n`;
      calculation += `  Profit: $${profit.toLocaleString()}\n\n`;
    });

    // Calculate market shares
    const totalUnitsSold = Object.values(results).reduce((sum, result) => sum + result.unitsSold, 0);
    Object.keys(results).forEach(teamIdStr => {
      const teamId = parseInt(teamIdStr);
      results[teamId].marketShare = totalUnitsSold > 0 ? (results[teamId].unitsSold / totalUnitsSold) * 100 : 0;
    });

    return { results, calculation };
  };

  const calculateRankings = (results: { [teamId: number]: BusinessResults }): { teamId: number; rank: number; score: number }[] => {
    // Scoring system: 40% profit, 30% market share, 20% revenue, 10% efficiency
    const rankings = Object.entries(results).map(([teamIdStr, result]) => {
      const teamId = parseInt(teamIdStr);
      const profitScore = Math.max(0, result.profit);
      const marketShareScore = result.marketShare * 1000;
      const revenueScore = result.revenue * 0.1;
      const efficiencyScore = result.unitsSold > 0 ? (result.profit / result.unitsSold) * 100 : 0;
      
      const totalScore = profitScore * 0.4 + marketShareScore * 0.3 + revenueScore * 0.2 + efficiencyScore * 0.1;
      
      return { teamId, score: totalScore, rank: 0 };
    });

    // Sort by score and assign ranks
    rankings.sort((a, b) => b.score - a.score);
    rankings.forEach((item, index) => {
      item.rank = index + 1;
    });

    return rankings;
  };

  const processRound = () => {
    const allSubmitted = teams.every(team => team.currentDecision !== null);
    if (!allSubmitted) {
      alert('All teams must submit their business decisions before processing the round!');
      return;
    }

    const { results, calculation } = calculateBusinessResults();
    const rankings = calculateRankings(results);
    
    const decisions = teams.reduce((acc, team) => {
      acc[team.id] = team.currentDecision!;
      return acc;
    }, {} as { [teamId: number]: BusinessDecision });

    const newRound: Round = {
      roundNumber: currentRound,
      decisions,
      results,
      rankings,
      calculation
    };

    setRounds(prev => [...prev, newRound]);

    // Update team totals
    setTeams(prev => prev.map(team => {
      const result = results[team.id];
      if (result) {
        return {
          ...team,
          totalProfit: team.totalProfit + result.profit,
          totalMarketShare: team.totalMarketShare + result.marketShare
        };
      }
      return team;
    }));

    setGamePhase('results');
  };

  const startNextRound = () => {
    setTeams(prev => prev.map(team => ({ ...team, currentDecision: null })));
    setCurrentRound(prev => prev + 1);
    setGamePhase('submission');
  };

  const resetGame = () => {
    setTeams(prev => prev.map(team => ({ ...team, totalProfit: 0, totalMarketShare: 0, currentDecision: null })));
    setRounds([]);
    setCurrentRound(1);
    setGamePhase('submission');
    setInputValues({});
  };

  const generateRandomData = () => {
    const randomInputs: { [teamId: number]: { productionLines: string; marketingSpend: string; unitPrice: string } } = {};
    
    teams.forEach(team => {
      const productionLines = Math.floor(Math.random() * 10) + 1; // 1-10
      const marketingSpend = Math.floor(Math.random() * 50000) + 5000; // 5k-55k
      const unitPrice = (Math.random() * 40 + 10).toFixed(2); // $10-$50
      
      randomInputs[team.id] = {
        productionLines: productionLines.toString(),
        marketingSpend: marketingSpend.toString(),
        unitPrice: unitPrice
      };
    });
    
    setInputValues(randomInputs);
  };

  if (showRules) {
    return <RulesPage onBack={() => setShowRules(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <img 
                  src="/SimbeesLogo.png" 
                  alt="Simbees Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  🐝 Simbees
                </h1>
                <p className="text-lg text-gray-600 mt-1">Round {currentRound} • Strategic Business Competition</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRules(true)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Rules & Strategy
              </button>
              <button
                onClick={resetGame}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Game
              </button>
            </div>
          </div>
          
          {/* Market Status Bar */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Market Active</span>
                </div>
                <div className="text-sm text-gray-600">
                  Base Market Size: <span className="font-bold text-gray-800">10,000 units</span>
                </div>
                <div className="text-sm text-gray-600">
                  Competition Level: <span className="font-bold text-red-600">High</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Phase: <span className="font-bold text-blue-600 capitalize">{gamePhase}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Dashboard */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Corporate Performance Dashboard
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teams.map((team, index) => (
              <div key={team.id} className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
                    <TeamIcon color={team.color} size="w-8 h-8" />
                  </div>
                  {team.totalProfit > 0 && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-3">{team.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Profit</span>
                    <span className={`font-bold text-lg ${team.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${team.totalProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Market Share</span>
                    <span className="font-bold text-blue-600">{team.totalMarketShare.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${team.color.replace('bg-', 'bg-')} opacity-70`}
                      style={{ width: `${Math.min(100, (team.totalMarketShare / 25) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {gamePhase === 'submission' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
              <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Strategic Business Decisions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map(team => (
                <div key={team.id} className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center mr-3 p-1">
                      <TeamIcon color={team.color} size="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl">{team.name}</h3>
                  </div>
                  
                  {team.currentDecision === null ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Production Lines (1-10)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={inputValues[team.id]?.productionLines || ''}
                          onChange={(e) => handleDecisionInput(team.id, 'productionLines', e.target.value)}
                          className="w-full border rounded px-3 py-2"
                          placeholder="e.g., 3"
                        />
                        <p className="text-xs text-gray-500 mt-1">More lines = higher capacity & lower unit costs</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Marketing Spend ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={inputValues[team.id]?.marketingSpend || ''}
                          onChange={(e) => handleDecisionInput(team.id, 'marketingSpend', e.target.value)}
                          className="w-full border rounded px-3 py-2"
                          placeholder="e.g., 10000"
                        />
                        <p className="text-xs text-gray-500 mt-1">Higher spend = more demand (diminishing returns)</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit Price ($)
                        </label>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={inputValues[team.id]?.unitPrice || ''}
                          onChange={(e) => handleDecisionInput(team.id, 'unitPrice', e.target.value)}
                          className="w-full border rounded px-3 py-2"
                          placeholder="e.g., 25.00"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower price = higher demand, but lower margins</p>
                      </div>
                      
                      <button
                        onClick={() => submitDecision(team.id)}
                        disabled={!inputValues[team.id]?.productionLines || !inputValues[team.id]?.marketingSpend || !inputValues[team.id]?.unitPrice}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                      >
                        Submit Strategy
                      </button>
                    </div>
                  ) : (
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-center text-green-600 font-bold mb-2">Strategy Submitted ✓</div>
                      <div className="text-sm space-y-1">
                        <div>Production Lines: {team.currentDecision.productionLines}</div>
                        <div>Marketing: ${team.currentDecision.marketingSpend.toLocaleString()}</div>
                        <div>Unit Price: ${team.currentDecision.unitPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 space-x-4">
              <button
                onClick={generateRandomData}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Generate Test Data
              </button>
              <button
                onClick={processRound}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-lg font-bold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Process Business Round
              </button>
            </div>
          </div>
        )}

        {gamePhase === 'results' && rounds.length > 0 && (
          <div className="space-y-6">
            {/* Rankings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Round {rounds[rounds.length - 1].roundNumber} Rankings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rounds[rounds.length - 1].rankings.map((ranking) => {
                  const team = teams.find(t => t.id === ranking.teamId)!;
                  const result = rounds[rounds.length - 1].results[ranking.teamId];
                  return (
                    <div key={ranking.teamId} className={`border-2 rounded-lg p-4 ${ranking.rank === 1 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center mr-2 p-1">
                          <TeamIcon color={team.color} size="w-6 h-6" />
                        </div>
                        <span className="font-bold">#{ranking.rank} {team.name}</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Profit: <span className="font-bold text-green-600">${result.profit.toLocaleString()}</span></div>
                        <div>Market Share: <span className="font-bold text-blue-600">{result.marketShare.toFixed(1)}%</span></div>
                        <div>Units Sold: {result.unitsSold.toLocaleString()}</div>
                        <div>Revenue: ${result.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Calculations */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Detailed Business Calculations</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono">{rounds[rounds.length - 1].calculation}</pre>
              </div>
              <div className="text-center">
                <button
                  onClick={startNextRound}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4 hover:bg-blue-600"
                >
                  Next Round
                </button>
                <button
                  onClick={resetGame}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Reset Game
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Round History */}
        {rounds.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Business History</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {rounds.slice().reverse().map((round) => (
                <div key={round.roundNumber} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Round {round.roundNumber}</h3>
                    <div className="text-sm text-gray-600">
                      Winner: {round.rankings[0] ? teams.find(t => t.id === round.rankings[0].teamId)?.name : 'None'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {Object.entries(round.results).map(([teamIdStr, result]) => {
                      const team = teams.find(t => t.id === parseInt(teamIdStr))!;
                      return (
                        <div key={teamIdStr} className="bg-gray-50 rounded p-2">
                          <div className="font-medium">{team.name}</div>
                          <div>Profit: ${result.profit.toLocaleString()}</div>
                          <div>Share: {result.marketShare.toFixed(1)}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
