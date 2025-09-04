'use client';

import { useState } from 'react';
import RulesPage from './components/RulesPage';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Team {
  id: number;
  name: string;
  color: string;
  totalProfit: number;
  totalMarketShare: number;
  currentDecision: BusinessDecision | null;
  results: BusinessResults[];
  // Advanced metrics
  cash: number;
  debt: number;
  productionCapacity: number;
  brandAwareness: number;
  customerSatisfaction: number;
  productPerformance: number;
  inventory: number;
}

interface BusinessDecision {
  // Core decision variables
  rdInvestment: number;        // R&D spending for product improvement
  productionCapacity: number;  // Manufacturing capacity investment
  marketingBudget: number;     // Marketing and advertising spend
  unitPrice: number;          // Product pricing strategy
  targetSegment: 'budget' | 'mainstream' | 'premium'; // Market segment focus
}

interface MarketSegment {
  name: string;
  size: number;               // Total market size
  priceElasticity: number;    // Price sensitivity
  qualityImportance: number;  // How much they value product performance
  brandImportance: number;    // How much they value brand awareness
  growthRate: number;         // Segment growth per round
}

interface BusinessResults {
  // Production metrics
  actualProduction: number;
  productionCostPerUnit: number;
  capacityUtilization: number;
  
  // Market metrics
  demandBySegment: { [segment: string]: number };
  unitsSoldBySegment: { [segment: string]: number };
  marketShareBySegment: { [segment: string]: number };
  
  // Financial metrics
  revenue: number;
  productionCosts: number;
  marketingCosts: number;
  rdCosts: number;
  operatingProfit: number;
  netProfit: number;
  
  // Performance metrics
  customerSatisfactionChange: number;
  brandAwarenessChange: number;
  productPerformanceChange: number;
  inventoryChange: number;
  
  // Competitive metrics
  competitivePosition: number;
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
      'azure-blue': '#3A86FF',
      'emerald-green': '#06D6A0',
      'crimson-red': '#EF476F',
      'violet-purple': '#8338EC'
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
  // Market segments with different characteristics
  const marketSegments: { [key: string]: MarketSegment } = {
    budget: {
      name: 'Budget Conscious',
      size: 40000,
      priceElasticity: 2.5,
      qualityImportance: 0.3,
      brandImportance: 0.2,
      growthRate: 0.02
    },
    mainstream: {
      name: 'Mainstream Market',
      size: 60000,
      priceElasticity: 1.5,
      qualityImportance: 0.6,
      brandImportance: 0.5,
      growthRate: 0.05
    },
    premium: {
      name: 'Premium Segment',
      size: 25000,
      priceElasticity: 0.8,
      qualityImportance: 0.9,
      brandImportance: 0.8,
      growthRate: 0.08
    }
  };

  const [teams, setTeams] = useState<Team[]>([
    { 
      id: 1, 
      name: 'Nexus Dynamics', 
      color: 'azure-blue', 
      totalProfit: 0, 
      totalMarketShare: 0, 
      currentDecision: null,
      results: [],
      cash: 1000000,
      debt: 0,
      productionCapacity: 10000,
      brandAwareness: 0.3,
      customerSatisfaction: 0.5,
      productPerformance: 0.5,
      inventory: 0
    },
    { 
      id: 2, 
      name: 'Vertex Solutions', 
      color: 'emerald-green', 
      totalProfit: 0, 
      totalMarketShare: 0, 
      currentDecision: null,
      results: [],
      cash: 1000000,
      debt: 0,
      productionCapacity: 10000,
      brandAwareness: 0.3,
      customerSatisfaction: 0.5,
      productPerformance: 0.5,
      inventory: 0
    },
    { 
      id: 3, 
      name: 'Apex Industries', 
      color: 'crimson-red', 
      totalProfit: 0, 
      totalMarketShare: 0, 
      currentDecision: null,
      results: [],
      cash: 1000000,
      debt: 0,
      productionCapacity: 10000,
      brandAwareness: 0.3,
      customerSatisfaction: 0.5,
      productPerformance: 0.5,
      inventory: 0
    },
    { 
      id: 4, 
      name: 'Quantum Ventures', 
      color: 'violet-purple', 
      totalProfit: 0, 
      totalMarketShare: 0, 
      currentDecision: null,
      results: [],
      cash: 1000000,
      debt: 0,
      productionCapacity: 10000,
      brandAwareness: 0.3,
      customerSatisfaction: 0.5,
      productPerformance: 0.5,
      inventory: 0
    },
  ]);

  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [gamePhase, setGamePhase] = useState<'submission' | 'results'>('submission');
  const [inputValues, setInputValues] = useState<{ [teamId: number]: { rdInvestment: string; productionCapacity: string; marketingBudget: string; unitPrice: string; targetSegment: string } }>({});
  const [showRules, setShowRules] = useState(false);

  const handleDecisionInput = (teamId: number, field: keyof BusinessDecision, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [teamId]: {
        rdInvestment: prev[teamId]?.rdInvestment || '',
        productionCapacity: prev[teamId]?.productionCapacity || '',
        marketingBudget: prev[teamId]?.marketingBudget || '',
        unitPrice: prev[teamId]?.unitPrice || '',
        targetSegment: prev[teamId]?.targetSegment || '',
        [field]: value
      }
    }));
  };

  const submitDecision = (teamId: number) => {
    const inputs = inputValues[teamId];
    if (!inputs) return;

    const rdInvestment = parseFloat(inputs.rdInvestment);
    const productionCapacity = parseFloat(inputs.productionCapacity);
    const marketingBudget = parseFloat(inputs.marketingBudget);
    const unitPrice = parseFloat(inputs.unitPrice);
    const targetSegment = inputs.targetSegment as 'budget' | 'mainstream' | 'premium';

    if (isNaN(rdInvestment) || isNaN(productionCapacity) || isNaN(marketingBudget) || isNaN(unitPrice)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const decision: BusinessDecision = {
      rdInvestment,
      productionCapacity,
      marketingBudget,
      unitPrice,
      targetSegment
    };

    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, currentDecision: decision } : team
    ));
    setInputValues(prev => ({ ...prev, [teamId]: { rdInvestment: '', productionCapacity: '', marketingBudget: '', unitPrice: '', targetSegment: '' } }));
  };

  // Advanced business calculation engine with market segments and competitive dynamics
  const calculateBusinessResults = (): { results: { [teamId: number]: BusinessResults }; calculation: string } => {
    const decisions = teams.reduce((acc, team) => {
      if (team.currentDecision) {
        acc[team.id] = team.currentDecision;
      }
      return acc;
    }, {} as { [teamId: number]: BusinessDecision });

    const results: { [teamId: number]: BusinessResults } = {};
    let calculation = `=== ROUND ${currentRound} ADVANCED BUSINESS SIMULATION ===\n\n`;

    // Calculate results for each team
    teams.forEach(team => {
      const decision = decisions[team.id];
      if (!decision) return;

      // Update team metrics based on decisions
      const updatedTeam = { ...team };
      
      // R&D Investment Effects
      const rdEffect = decision.rdInvestment / 100000; // Normalize R&D investment
      updatedTeam.productPerformance = Math.min(1.0, team.productPerformance + (rdEffect * 0.1));
      
      // Marketing Budget Effects
      const marketingEffect = decision.marketingBudget / 50000; // Normalize marketing budget
      updatedTeam.brandAwareness = Math.min(1.0, team.brandAwareness + (marketingEffect * 0.05));
      
      // Production capacity update
      updatedTeam.productionCapacity = decision.productionCapacity;
      
      // Calculate demand by market segment
      const demandBySegment: { [segment: string]: number } = {};
      const unitsSoldBySegment: { [segment: string]: number } = {};
      const marketShareBySegment: { [segment: string]: number } = {};
      
      let totalDemand = 0;
      let totalUnitsSold = 0;
      
      Object.entries(marketSegments).forEach(([segmentKey, segment]) => {
        // Base demand calculation
        let segmentDemand = segment.size * 0.1; // 10% of segment size as base demand
        
        // Price elasticity effect
        const priceEffect = Math.pow(decision.unitPrice / 50, -segment.priceElasticity);
        
        // Quality effect (product performance)
        const qualityEffect = 1 + (updatedTeam.productPerformance * segment.qualityImportance);
        
        // Brand effect
        const brandEffect = 1 + (updatedTeam.brandAwareness * segment.brandImportance);
        
        // Target segment bonus
        const targetBonus = decision.targetSegment === segmentKey ? 1.5 : 1.0;
        
        // Calculate final demand for this segment
        segmentDemand = Math.floor(segmentDemand * priceEffect * qualityEffect * brandEffect * targetBonus);
        
        // Production constraint
        const segmentSold = Math.min(segmentDemand, updatedTeam.productionCapacity * 0.4); // Max 40% to any segment
        
        demandBySegment[segmentKey] = segmentDemand;
        unitsSoldBySegment[segmentKey] = segmentSold;
        
        totalDemand += segmentDemand;
        totalUnitsSold += segmentSold;
      });
      
      // Financial calculations
      const actualProduction = Math.min(totalUnitsSold, updatedTeam.productionCapacity);
      const capacityUtilization = actualProduction / updatedTeam.productionCapacity;
      
      // Production costs (economies of scale)
      const baseCostPerUnit = 25;
      const productionCostPerUnit = baseCostPerUnit * (1 - (capacityUtilization * 0.2)); // 20% cost reduction at full capacity
      
      const revenue = totalUnitsSold * decision.unitPrice;
      const productionCosts = actualProduction * productionCostPerUnit;
      const marketingCosts = decision.marketingBudget;
      const rdCosts = decision.rdInvestment;
      
      const operatingProfit = revenue - productionCosts - marketingCosts;
      const netProfit = operatingProfit - rdCosts;
      
      // Performance metrics changes
      const customerSatisfactionChange = (updatedTeam.productPerformance - team.productPerformance) * 0.5;
      const brandAwarenessChange = updatedTeam.brandAwareness - team.brandAwareness;
      const productPerformanceChange = updatedTeam.productPerformance - team.productPerformance;
      const inventoryChange = actualProduction - totalUnitsSold;
      
      // Competitive position (simplified)
      const competitivePosition = (updatedTeam.productPerformance + updatedTeam.brandAwareness) / 2;
      
      results[team.id] = {
        actualProduction,
        productionCostPerUnit,
        capacityUtilization,
        demandBySegment,
        unitsSoldBySegment,
        marketShareBySegment,
        revenue,
        productionCosts,
        marketingCosts,
        rdCosts,
        operatingProfit,
        netProfit,
        customerSatisfactionChange,
        brandAwarenessChange,
        productPerformanceChange,
        inventoryChange,
        competitivePosition,
        marketShare: 0 // Will be calculated after all teams
      };

      // Update team state
      setTeams(prev => prev.map(t => t.id === team.id ? updatedTeam : t));

      // Detailed calculation log
      calculation += `${team.name} (${decision.targetSegment.toUpperCase()} Focus):\n`;
      calculation += `  R&D Investment: $${decision.rdInvestment.toLocaleString()}\n`;
      calculation += `  Production Capacity: ${decision.productionCapacity.toLocaleString()} units\n`;
      calculation += `  Marketing Budget: $${decision.marketingBudget.toLocaleString()}\n`;
      calculation += `  Unit Price: $${decision.unitPrice}\n`;
      calculation += `  \n`;
      calculation += `  Market Performance:\n`;
      Object.entries(demandBySegment).forEach(([seg, demand]) => {
        calculation += `    ${marketSegments[seg].name}: ${demand.toLocaleString()} demand, ${unitsSoldBySegment[seg].toLocaleString()} sold\n`;
      });
      calculation += `  \n`;
      calculation += `  Financial Results:\n`;
      calculation += `    Revenue: $${revenue.toLocaleString()}\n`;
      calculation += `    Production Costs: $${productionCosts.toLocaleString()}\n`;
      calculation += `    Marketing Costs: $${marketingCosts.toLocaleString()}\n`;
      calculation += `    R&D Costs: $${rdCosts.toLocaleString()}\n`;
      calculation += `    Net Profit: $${netProfit.toLocaleString()}\n`;
      calculation += `  \n`;
      calculation += `  Performance Metrics:\n`;
      calculation += `    Product Performance: ${(updatedTeam.productPerformance * 100).toFixed(1)}%\n`;
      calculation += `    Brand Awareness: ${(updatedTeam.brandAwareness * 100).toFixed(1)}%\n`;
      calculation += `    Capacity Utilization: ${(capacityUtilization * 100).toFixed(1)}%\n`;
      calculation += `    Competitive Position: ${(competitivePosition * 100).toFixed(1)}%\n\n`;
    });

    // Calculate market shares
    const totalUnitsSoldAllTeams = Object.values(results).reduce((sum, result) => 
      sum + Object.values(result.unitsSoldBySegment).reduce((segSum, units) => segSum + units, 0), 0);
    
    Object.keys(results).forEach(teamIdStr => {
      const teamId = parseInt(teamIdStr);
      const teamTotalSold = Object.values(results[teamId].unitsSoldBySegment).reduce((sum, units) => sum + units, 0);
      if (totalUnitsSoldAllTeams > 0) {
        results[teamId].marketShare = (teamTotalSold / totalUnitsSoldAllTeams) * 100;
      }
    });

    return { results, calculation };
  };

// ...
  const calculateRankings = (results: { [teamId: number]: BusinessResults }): { teamId: number; rank: number; score: number }[] => {
    // Advanced scoring system: 40% net profit, 30% market share, 20% competitive position, 10% efficiency
    const rankings = Object.entries(results).map(([teamIdStr, result]) => {
      const teamId = parseInt(teamIdStr);
      const profitScore = Math.max(0, result.netProfit);
      const marketShareScore = result.marketShare * 1000;
      const competitiveScore = result.competitivePosition * 10000;
      const totalUnitsSold = Object.values(result.unitsSoldBySegment).reduce((sum, units) => sum + units, 0);
      const efficiencyScore = totalUnitsSold > 0 ? (result.netProfit / totalUnitsSold) * 100 : 0;
      
      const totalScore = profitScore * 0.4 + marketShareScore * 0.3 + competitiveScore * 0.2 + efficiencyScore * 0.1;
      
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
        const updatedResults = [...team.results, result];
        const totalProfit = updatedResults.reduce((sum: number, result: BusinessResults) => sum + (result.netProfit || 0), 0);
        return {
          ...team,
          results: updatedResults,
          totalProfit: totalProfit,
          totalMarketShare: team.totalMarketShare + (result.marketShare || 0)
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
    setInputValues({
      1: { rdInvestment: '50000', productionCapacity: '15000', marketingBudget: '50000', unitPrice: '75', targetSegment: 'mainstream' },
      2: { rdInvestment: '40000', productionCapacity: '12000', marketingBudget: '40000', unitPrice: '80', targetSegment: 'premium' },
      3: { rdInvestment: '60000', productionCapacity: '18000', marketingBudget: '60000', unitPrice: '70', targetSegment: 'budget' },
      4: { rdInvestment: '45000', productionCapacity: '14000', marketingBudget: '45000', unitPrice: '85', targetSegment: 'premium' },
    });
  };

  const generateRandomData = () => {
    const randomInputs: { [teamId: number]: { rdInvestment: string; productionCapacity: string; marketingBudget: string; unitPrice: string; targetSegment: string } } = {};
    
    teams.forEach(team => {
      const rdInvestment = Math.floor(Math.random() * 150000) + 25000; // 25k-175k
      const productionCapacity = Math.floor(Math.random() * 30000) + 10000; // 10k-40k
      const marketingBudget = Math.floor(Math.random() * 200000) + 30000; // 30k-230k
      const unitPrice = (Math.random() * 80 + 40).toFixed(2); // $40-$120
      const segments = ['budget', 'mainstream', 'premium'];
      const targetSegment = segments[Math.floor(Math.random() * segments.length)];
      
      randomInputs[team.id] = {
        rdInvestment: rdInvestment.toString(),
        productionCapacity: productionCapacity.toString(),
        marketingBudget: marketingBudget.toString(),
        unitPrice: unitPrice,
        targetSegment: targetSegment
      };
    });
    
    setInputValues(randomInputs);
  };

  if (showRules) {
    return <RulesPage onBack={() => setShowRules(false)} />;
  }

  return (
    <div className="min-h-screen bg-simbees-light-gray p-4">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="bg-simbees-white rounded-2xl shadow-2xl p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-simbees-honey rounded-xl shadow-lg flex items-center justify-center p-2">
                <img src="/SimbeesLogo.png" alt="Simbees Logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-simbees-black">
                  Simbees
                </h1>
                <p className="text-lg text-simbees-charcoal mt-1">Round {currentRound} • Strategic Business Competition</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRules(true)}
                className="flex items-center px-6 py-3 bg-simbees-honey text-simbees-black rounded-xl hover:bg-simbees-orange transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Rules & Strategy
              </button>
              <button
                onClick={resetGame}
                className="flex items-center px-6 py-3 bg-simbees-charcoal text-simbees-white rounded-xl hover:bg-simbees-black transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Game
              </button>
            </div>
          </div>
          
          {/* Market Status Bar */}
          <div className="bg-simbees-honey bg-opacity-10 rounded-xl p-4 border border-simbees-honey border-opacity-20 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-simbees-profit rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-simbees-black">Market Active</span>
                </div>
                <div className="text-sm text-simbees-charcoal">
                  Base Market Size: <span className="font-bold text-simbees-black">10,000 units</span>
                </div>
                <div className="text-sm text-simbees-charcoal">
                  Competition Level: <span className="font-bold text-simbees-loss">High</span>
                </div>
              </div>
              <div className="text-sm text-simbees-charcoal">
                Phase: <span className="font-bold text-simbees-honey capitalize">{gamePhase}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Dashboard */}
        <div className="bg-simbees-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-simbees-black mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Corporate Performance Dashboard
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teams.map((team, index) => (
              <div key={team.id} className="relative bg-simbees-light-gray rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-simbees-white rounded-xl shadow-lg flex items-center justify-center p-2 border border-gray-100">
                    <TeamIcon color={team.color} size="w-8 h-8" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div 
                      className="w-3 h-3 rounded-full opacity-80"
                      style={{
                        backgroundColor: team.color === 'azure-blue' ? '#3A86FF' : 
                                       team.color === 'emerald-green' ? '#06D6A0' :
                                       team.color === 'crimson-red' ? '#EF476F' : '#8338EC'
                      }}
                    ></div>
                    {team.totalProfit > 0 && (
                      <svg className="w-4 h-4 text-simbees-profit" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-simbees-black mb-3">{team.name}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-simbees-charcoal">Total Profit</span>
                    <span className={`font-bold text-lg ${team.totalProfit >= 0 ? 'text-simbees-profit' : 'text-simbees-loss'}`}>
                      ${team.totalProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-simbees-charcoal">Market Share</span>
                    <span className="font-bold text-simbees-black">{team.totalMarketShare.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-simbees-charcoal">Rank</span>
                    <span className="font-bold text-simbees-black">#{index + 1}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, (team.totalMarketShare / 25) * 100)}%`,
                        backgroundColor: team.color === 'azure-blue' ? '#3A86FF' : 
                                       team.color === 'emerald-green' ? '#06D6A0' :
                                       team.color === 'crimson-red' ? '#EF476F' : '#8338EC'
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-simbees-charcoal mt-1 text-center">Market Position</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Charts */}
        {rounds.length > 0 && (
          <div className="bg-simbees-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-simbees-black mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Performance Analytics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profit Chart */}
              <div className="bg-simbees-light-gray rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-simbees-black mb-4">Cumulative Profit Trends</h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: rounds.map((_, i) => `Round ${i + 1}`),
                      datasets: teams.map(team => {
                        const profits = rounds.map(round => round.results[team.id]?.netProfit || 0);
                        const cumulativeProfits = profits.reduce((acc, profit, i) => {
                          acc.push((acc[i - 1] || 0) + profit);
                          return acc;
                        }, [] as number[]);
                        
                        return {
                          label: team.name,
                          data: cumulativeProfits,
                          borderColor: team.color === 'azure-blue' ? '#3A86FF' : 
                                      team.color === 'emerald-green' ? '#06D6A0' :
                                      team.color === 'crimson-red' ? '#EF476F' : '#8338EC',
                          backgroundColor: (team.color === 'azure-blue' ? '#3A86FF' : 
                                          team.color === 'emerald-green' ? '#06D6A0' :
                                          team.color === 'crimson-red' ? '#EF476F' : '#8338EC') + '20',
                          borderWidth: 3,
                          fill: false,
                          tension: 0.4,
                          pointBackgroundColor: team.color === 'azure-blue' ? '#3A86FF' : 
                                               team.color === 'emerald-green' ? '#06D6A0' :
                                               team.color === 'crimson-red' ? '#EF476F' : '#8338EC',
                          pointBorderColor: '#ffffff',
                          pointBorderWidth: 2,
                          pointRadius: 6,
                          pointHoverRadius: 8,
                        };
                      })
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                          labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                              size: 12
                            }
                          }
                        },
                        tooltip: {
                          mode: 'index',
                          intersect: false,
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: '#ffffff',
                          bodyColor: '#ffffff',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          borderWidth: 1,
                          callbacks: {
                            label: function(context) {
                              return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                          },
                          ticks: {
                            callback: function(value) {
                              return '$' + Number(value).toLocaleString();
                            },
                            color: '#64748b',
                            font: {
                              size: 11
                            }
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                          },
                          ticks: {
                            color: '#64748b',
                            font: {
                              size: 11
                            }
                          }
                        }
                      },
                      interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                      }
                    }}
                  />
                </div>
              </div>

              {/* Market Share Chart */}
              <div className="bg-simbees-light-gray rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-simbees-black mb-4">Market Share Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-48 h-48">
                    <Doughnut
                      data={{
                        labels: teams.map(team => team.name),
                        datasets: [{
                          data: teams.map(team => team.totalMarketShare || 0),
                          backgroundColor: teams.map(team => 
                            team.color === 'azure-blue' ? '#3A86FF' : 
                            team.color === 'emerald-green' ? '#06D6A0' :
                            team.color === 'crimson-red' ? '#EF476F' : '#8338EC'
                          ),
                          borderColor: '#ffffff',
                          borderWidth: 3,
                          hoverBorderWidth: 4,
                          hoverOffset: 8,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '60%',
                        plugins: {
                          legend: {
                            display: false
                          },
                          tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            callbacks: {
                              label: function(context) {
                                return `${context.label}: ${context.parsed.toFixed(1)}%`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {teams.map(team => (
                    <div key={team.id} className="flex items-center justify-between p-3 bg-simbees-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: team.color === 'azure-blue' ? '#3A86FF' : 
                                           team.color === 'emerald-green' ? '#06D6A0' :
                                           team.color === 'crimson-red' ? '#EF476F' : '#8338EC'
                          }}
                        ></div>
                        <span className="text-sm text-simbees-charcoal font-medium">{team.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-sm font-bold text-simbees-black">{team.totalMarketShare.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {gamePhase === 'submission' && (
          <div className="bg-simbees-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center text-simbees-black">
              <svg className="w-6 h-6 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Strategic Business Decisions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map(team => (
                <div key={team.id} className="bg-simbees-light-gray rounded-xl p-6 border border-gray-200 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-simbees-white rounded-lg shadow-md flex items-center justify-center mr-3 p-1">
                      <TeamIcon color={team.color} size="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-simbees-black">{team.name}</h3>
                  </div>
                  
                  {!team.currentDecision ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-simbees-charcoal mb-2">
                          R&D Investment ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="200000"
                          value={inputValues[team.id]?.rdInvestment || ''}
                          onChange={(e) => handleDecisionInput(team.id, 'rdInvestment', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simbees-primary focus:border-transparent"
                          placeholder="0-200,000"
                        />
                        <p className="text-xs text-simbees-charcoal mt-1">Improves product performance</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-simbees-charcoal mb-2">
                          Production Capacity (units)
                        </label>
                        <input
                          type="number"
                          min="5000"
                          max="50000"
                          value={inputValues[team.id]?.productionCapacity || ''}
                          onChange={(e) => handleDecisionInput(team.id, 'productionCapacity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simbees-primary focus:border-transparent"
                          placeholder="5,000-50,000"
                        />
                        <p className="text-xs text-simbees-charcoal mt-1">Maximum units you can produce</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-simbees-charcoal mb-2">
                          Marketing Budget ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="300000"
                          value={inputValues[team.id]?.marketingBudget || ''}
                          onChange={(e) => handleDecisionInput(team.id, 'marketingBudget', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simbees-primary focus:border-transparent"
                          placeholder="0-300,000"
                        />
                        <p className="text-xs text-simbees-charcoal mt-1">Increases brand awareness</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-simbees-charcoal mb-2">
                          Unit Price ($)
                        </label>
                        <input
                          type="number"
                          min="20"
                          max="150"
                          step="0.01"
                          value={inputValues[team.id]?.unitPrice || ''}
                          onChange={(e) => handleDecisionInput(team.id, 'unitPrice', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simbees-primary focus:border-transparent"
                          placeholder="20.00-150.00"
                        />
                        <p className="text-xs text-simbees-charcoal mt-1">Price per unit sold</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-simbees-charcoal mb-2">
                          Target Market Segment
                        </label>
                        <select
                          value={inputValues[team.id]?.targetSegment || 'mainstream'}
                          onChange={(e) => handleDecisionInput(team.id, 'targetSegment', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-simbees-primary focus:border-transparent"
                        >
                          <option value="budget">Budget Conscious (Price Sensitive)</option>
                          <option value="mainstream">Mainstream Market (Balanced)</option>
                          <option value="premium">Premium Segment (Quality Focused)</option>
                        </select>
                        <p className="text-xs text-simbees-charcoal mt-1">Focus marketing efforts on specific segment</p>
                      </div>
                      <button
                        onClick={() => submitDecision(team.id)}
                        className="w-full bg-simbees-primary text-simbees-black py-3 rounded-lg hover:bg-simbees-honey transition-colors font-semibold shadow-md hover:shadow-lg"
                      >
                        Submit Strategy
                      </button>
                    </div>
                  ) : (
                    <div className="bg-simbees-white rounded-lg p-4 border border-green-200">
                      <div className="text-center text-simbees-profit font-bold mb-3 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Strategy Submitted
                      </div>
                      <div className="text-sm space-y-2 text-simbees-charcoal">
                        <div className="flex justify-between">
                          <span>R&D Investment:</span>
                          <span className="font-medium">${team.currentDecision.rdInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Production Capacity:</span>
                          <span className="font-medium">{team.currentDecision.productionCapacity.toLocaleString()} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Marketing Budget:</span>
                          <span className="font-medium">${team.currentDecision.marketingBudget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unit Price:</span>
                          <span className="font-medium">${team.currentDecision.unitPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Target Segment:</span>
                          <span className="font-medium capitalize">{team.currentDecision.targetSegment}</span>
                        </div>
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
                        <div>Profit: <span className="font-bold text-green-600">${(result.netProfit || 0).toLocaleString()}</span></div>
                        <div>Market Share: <span className="font-bold text-blue-600">{(result.marketShare || 0).toFixed(1)}%</span></div>
                        <div>Units Sold: {Object.values(result.unitsSoldBySegment || {}).reduce((sum, units) => sum + (units || 0), 0).toLocaleString()}</div>
                        <div>Revenue: ${(result.revenue || 0).toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Calculations */}
            <div className="bg-simbees-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-simbees-black flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 text-simbees-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Business Performance Analysis
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rounds.length > 0 && Object.entries(rounds[rounds.length - 1].results).map(([teamIdStr, result]) => {
                  const teamId = parseInt(teamIdStr);
                  const team = teams.find(t => t.id === teamId);
                  const decision = rounds[rounds.length - 1].decisions[teamId];
                  
                  if (!team || !decision || !result) return null;
                  
                  return (
                    <div key={teamId} className="bg-simbees-light-gray rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-simbees-white rounded-lg shadow-md flex items-center justify-center mr-3 p-1 border border-gray-100">
                          <TeamIcon color={team.color} size="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-simbees-black">{team.name}</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Production Metrics */}
                        <div className="bg-simbees-white rounded-lg p-4 border border-gray-100">
                          <h4 className="text-sm font-semibold text-simbees-charcoal mb-3 uppercase tracking-wide">Production</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <span className="text-xs text-simbees-charcoal">Capacity</span>
                              <div className="text-lg font-bold text-simbees-black">{(decision?.productionCapacity || 0).toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-xs text-simbees-charcoal">Actual Production</span>
                              <div className="text-lg font-bold text-simbees-black">{(result?.actualProduction || 0).toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-xs text-simbees-charcoal">Cost/Unit</span>
                              <div className="text-lg font-bold text-simbees-black">${(result?.productionCostPerUnit || 0).toFixed(2)}</div>
                            </div>
                            <div>
                              <span className="text-xs text-simbees-charcoal">Total Units Sold</span>
                              <div className="text-lg font-bold text-simbees-black">{Object.values(result?.unitsSoldBySegment || {}).reduce((sum, units) => sum + (units || 0), 0).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        {/* Financial Metrics */}
                        <div className="bg-simbees-white rounded-lg p-4 border border-gray-100">
                          <h4 className="text-sm font-semibold text-simbees-charcoal mb-3 uppercase tracking-wide">Financial</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <span className="text-xs text-simbees-charcoal">Unit Price</span>
                              <div className="text-lg font-bold text-simbees-black">${(decision?.unitPrice || 0).toFixed(2)}</div>
                            </div>
                            <div>
                              <span className="text-xs text-simbees-charcoal">Marketing</span>
                              <div className="text-lg font-bold text-simbees-black">${(decision?.marketingBudget || 0).toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-xs text-simbees-charcoal">Revenue</span>
                              <div className="text-lg font-bold text-simbees-neutral">${(result?.revenue || 0).toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-xs text-simbees-charcoal">Total Costs</span>
                              <div className="text-lg font-bold text-simbees-orange">${((result?.productionCosts || 0) + (result?.marketingCosts || 0) + (result?.rdCosts || 0)).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        {/* Performance Summary */}
                        <div className="bg-simbees-white rounded-lg p-4 border border-gray-100">
                          <h4 className="text-sm font-semibold text-simbees-charcoal mb-3 uppercase tracking-wide">Performance</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <span className="text-xs text-simbees-charcoal">Total Demand</span>
                              <div className="text-lg font-bold text-simbees-black">{Object.values(result?.demandBySegment || {}).reduce((sum, demand) => sum + (demand || 0), 0).toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-xs text-simbees-charcoal">Market Share</span>
                              <div className="text-lg font-bold text-simbees-black">{(result?.marketShare || 0).toFixed(1)}%</div>
                            </div>
                            <div className="col-span-2">
                              <span className="text-xs text-simbees-charcoal">Net Profit</span>
                              <div className={`text-2xl font-bold ${(result?.netProfit || 0) >= 0 ? 'text-simbees-profit' : 'text-simbees-loss'}`}>
                                ${(result?.netProfit || 0).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={startNextRound}
                  className="flex items-center px-8 py-3 bg-simbees-honey text-simbees-black rounded-xl hover:bg-simbees-orange transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Next Round
                </button>
                <button
                  onClick={resetGame}
                  className="flex items-center px-8 py-3 bg-simbees-charcoal text-simbees-white rounded-xl hover:bg-simbees-black transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
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
                      const team = teams.find(t => t.id === parseInt(teamIdStr));
                      if (!team || !result) return null;
                      return (
                        <div key={teamIdStr} className="bg-gray-50 rounded p-2">
                          <div className="font-medium">{team.name}</div>
                          <div>Profit: ${(result.netProfit || 0).toLocaleString()}</div>
                          <div>Share: {(result.marketShare || 0).toFixed(1)}%</div>
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
