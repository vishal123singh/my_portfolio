"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import {
  BrainCircuit,
  Sun,
  Moon,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  LineChart,
  Wallet,
  AlertCircle,
  Clock,
  TrendingUp,
  BarChart2,
  DollarSign,
  Percent,
  Scale,
  Zap,
  Newspaper,
  BadgeCheck,
  AlertTriangle,
  Gauge,
  Circle,
  ChevronRight,
  Info,
  CandlestickChart,
  PieChart,
  History,
  Calendar,
  Database,
  Activity,
  ThumbsUp,
  ThumbsDown,
  GanttChart,
  ArrowRightLeft,
} from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

// Combined data structure
const stocks = {
  SOFI: {
    // Simple data
    simple: {
      name: "SoFi Technologies",
      description: "Online banking and loans",
      currentPrice: 7.18,
      forecast: [
        { month: "Dec", price: 7.25 },
        { month: "Jan", price: 7.4 },
        { month: "Feb", price: 7.6 },
        { month: "Mar", price: 7.85 },
      ],
      whyGood: [
        "Growing quickly in online banking",
        "Many young customers joining",
        "Making profit sooner than expected",
      ],
      thingsToKnow: [
        "New to banking - still proving itself",
        "Stock price moves up and down a lot",
      ],
      news: [
        {
          title: "SoFi beats expectations",
          summary: "Made more money than experts predicted last quarter",
          sentiment: "positive",
          date: "3 days ago",
        },
        {
          title: "New banking features",
          summary: "Added tools to help customers save money",
          sentiment: "positive",
          date: "1 week ago",
        },
      ],
    },
    // Advanced data
    advanced: {
      symbol: "SOFI",
      name: "SoFi Technologies, Inc.",
      historicalData: [
        {
          date: "2024-11-25",
          close: 6.95,
          open: 6.89,
          high: 7.02,
          low: 6.82,
          volume: 45200000,
        },
        // ... more historical data
      ],
      forecastData: [
        { date: "2024-12-05", predicted: 7.22, upper: 7.35, lower: 7.1 },
        // ... more forecast data
      ],
      fundamentals: {
        marketCap: "7.2B",
        peRatio: 25.4,
        revenueGrowth: "+22%",
        profitMargin: "12.5%",
        debtToEquity: 0.42,
        beta: 1.32,
        dividendYield: "0%",
        eps: 0.28,
      },
      news: [
        {
          title: "SoFi beats Q4 earnings expectations",
          source: "Financial Times",
          date: "2 hours ago",
          sentiment: "positive",
          impact: "high",
          summary:
            "SoFi reported Q4 earnings of $0.12 per share, beating analyst estimates of $0.09 per share.",
        },
        // ... more news
      ],
      analysis: {
        technical: "Bullish",
        sentiment: "Very Positive",
        momentum: "Strong",
        volatility: "High",
      },
    },
  },
  // ... other stocks
};

const recommendations = {
  simple: [
    {
      symbol: "SOFI",
      rating: "Strong Buy",
      confidence: 87,
      potential: "+20% in 6-12 months",
      risk: "Medium",
    },
    // ... other simple recommendations
  ],
  advanced: [
    {
      symbol: "SOFI",
      score: 92,
      risk: "Medium",
      action: "BUY",
      confidence: 87,
      sector: "Fintech",
      lastClose: 7.18,
      target: 8.5,
      upside: "+18.4%",
      timeHorizon: "6-12 months",
    },
    // ... other advanced recommendations
  ],
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedStock, setSelectedStock] = useState("SOFI");
  const [simpleMode, setSimpleMode] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const stockData = stocks[selectedStock];
  const currentModeData = simpleMode ? stockData.simple : stockData.advanced;
  const currentRecs = simpleMode
    ? recommendations.simple
    : recommendations.advanced;
  const stockRec = currentRecs.find((r) => r.symbol === selectedStock);

  // Render function for Simple Mode
  const renderSimpleMode = () => (
    <>
      {/* Stock Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold">{currentModeData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
              <Wallet className="h-4 w-4" />
              {currentModeData.description}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Current Price
                </p>
                <p className="text-3xl font-bold">
                  ${currentModeData.currentPrice.toFixed(2)}
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium flex items-center gap-1">
                  <BadgeCheck className="h-4 w-4" />
                  Our Recommendation: {stockRec.rating}
                </p>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  {stockRec.confidence}% confidence
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="h-64">
              <Line
                data={{
                  labels: [
                    "Now",
                    ...currentModeData.forecast.map((f) => f.month),
                  ],
                  datasets: [
                    {
                      label: "Expected Price",
                      data: [
                        currentModeData.currentPrice,
                        ...currentModeData.forecast.map((f) => f.price),
                      ],
                      borderColor: "#10b981",
                      borderWidth: 3,
                      tension: 0.4,
                      fill: false,
                      pointBackgroundColor: "#10b981",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { ticks: { callback: (value) => "$" + value } },
                  },
                }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
              Expected price over next few months
            </p>
          </div>
        </div>
      </div>

      {/* Why Consider This Stock */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
          <ThumbsUp className="h-5 w-5 text-green-500" />
          Why This Could Be Good
        </h3>
        <ul className="space-y-3">
          {currentModeData.whyGood.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Circle className="h-3 w-3 mt-1.5 text-green-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Things to Consider */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Things to Keep in Mind
        </h3>
        <ul className="space-y-3">
          {currentModeData.thingsToKnow.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Circle className="h-3 w-3 mt-1.5 text-yellow-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent News */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Newspaper className="h-5 w-5 text-blue-500" />
          Recent News
        </h3>
        <div className="space-y-4">
          {currentModeData.news.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{item.title}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    item.sentiment === "positive"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {item.sentiment === "positive" ? (
                    <ThumbsUp className="h-3 w-3" />
                  ) : (
                    <ThumbsDown className="h-3 w-3" />
                  )}
                  {item.sentiment}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {item.summary}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // Render function for Advanced Mode
  const renderAdvancedMode = () => (
    <>
      {/* Stock Navigation */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-blue-900/30 text-blue-400 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="h-5 w-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-6 py-3 font-medium flex items-center gap-2 ${
              activeTab === "chart"
                ? "bg-blue-900/30 text-blue-400 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LineChart className="h-5 w-5" />
            Chart
          </button>
          {/* ... other tabs */}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Advanced overview content */}
          {/* ... */}
        </div>
      )}

      {activeTab === "chart" && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          {/* Advanced chart content */}
          {/* ... */}
        </div>
      )}

      {/* ... other tab contents */}
    </>
  );

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`min-h-screen px-4 py-8 font-sans transition-colors ${
          simpleMode
            ? "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200"
            : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto space-y-8 ${
            simpleMode ? "" : "dark:text-white"
          }`}
        >
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  simpleMode
                    ? "bg-gradient-to-br from-blue-500 to-emerald-500"
                    : "bg-gradient-to-br from-blue-600 to-emerald-600"
                }`}
              >
                <BrainCircuit className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1
                  className={`text-3xl font-bold bg-gradient-to-r ${
                    simpleMode
                      ? "from-blue-600 to-emerald-600"
                      : "from-blue-400 to-emerald-400"
                  } bg-clip-text text-transparent`}
                >
                  {simpleMode ? "Simple Stock Guide" : "AI Stock Advisor"}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {simpleMode
                    ? "Easy-to-understand investing help"
                    : "Advanced analytics for investors"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Mode Toggle */}
              <button
                onClick={() => setSimpleMode(!simpleMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  simpleMode
                    ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    : "bg-gray-800 border-gray-700 text-gray-300"
                }`}
              >
                <ArrowRightLeft className="h-5 w-5" />
                {simpleMode ? "Advanced View" : "Simple View"}
              </button>

              {/* Stock Selector */}
              <div className="relative">
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className={`appearance-none rounded-lg py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    simpleMode
                      ? "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
                      : "bg-gray-800 border border-gray-700 text-white"
                  }`}
                >
                  {Object.keys(stocks).map((symbol) => (
                    <option key={symbol} value={symbol}>
                      {stocks[symbol].simple.name} ({symbol})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  simpleMode
                    ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    : "bg-gray-800 border-gray-700 text-gray-300"
                }`}
              >
                {darkMode ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Main Content */}
          {simpleMode ? renderSimpleMode() : renderAdvancedMode()}

          {/* Recommendations Section */}
          <div
            className={`rounded-xl shadow-sm p-6 border ${
              simpleMode
                ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                : "bg-gray-800/50 border-gray-700"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BadgeCheck className="h-6 w-6" />
              {simpleMode ? "Other Stocks We Like" : "Top AI Recommendations"}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {currentRecs
                .filter((r) => r.symbol !== selectedStock)
                .map((stock) => (
                  <div
                    key={stock.symbol}
                    className={`rounded-lg p-4 cursor-pointer transition-colors ${
                      simpleMode
                        ? "border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                        : "bg-gray-700/30 border border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedStock(stock.symbol)}
                  >
                    <h4 className="font-bold">
                      {stocks[stock.symbol].simple.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stocks[stock.symbol].simple.description}
                    </p>
                    {simpleMode ? (
                      <div
                        className={`mt-2 px-2 py-1 text-xs rounded-full inline-flex items-center ${
                          stock.rating === "Strong Buy"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                            : stock.rating === "Buy"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {stock.rating}
                      </div>
                    ) : (
                      <div
                        className={`mt-2 px-2 py-1 text-xs rounded-full inline-flex items-center ${
                          stock.action === "BUY"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}
                      >
                        {stock.action}
                      </div>
                    )}
                    <p className="text-sm mt-2">
                      <span className="font-medium">Potential:</span>{" "}
                      {simpleMode ? stock.potential : stock.upside}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <footer className="text-center text-sm pt-8 border-t border-gray-800">
            <p
              className={
                simpleMode
                  ? "text-gray-500 dark:text-gray-600"
                  : "text-gray-500"
              }
            >
              © 2025 {simpleMode ? "Simple Stock Guide" : "AI Stock Advisor"} —{" "}
              {simpleMode
                ? "Investing help for everyone"
                : "Predictive analytics for investors"}
            </p>
            <p
              className={`mt-1 text-xs ${
                simpleMode
                  ? "text-gray-400 dark:text-gray-700"
                  : "text-gray-600"
              }`}
            >
              Data is simulated for demonstration purposes
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
