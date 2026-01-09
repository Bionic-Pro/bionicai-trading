import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { BlofinService } from '../services/blofin';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export function PerformancePage() {
  const [trades, setTrades] = useState<any[]>([]);
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const blofinService = new BlofinService();

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [tradeHistory, perf] = await Promise.all([
        blofinService.getTradeHistory(),
        blofinService.getPerformance()
      ]);
      
      setTrades(tradeHistory);
      setPerformance(perf);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const equityCurveData = {
    labels: trades.map((_, i) => `Trade ${i + 1}`),
    datasets: [{
      label: 'Equity Curve',
      data: trades.map((_, index) => {
        let cumulative = 0;
        for (let j = 0; j <= index; j++) {
          cumulative += trades[j].pnl || 0;
        }
        return cumulative;
      }),
      borderColor: '#00ff00',
      backgroundColor: 'rgba(0, 255, 0, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  const winLossData = {
    labels: ['Wins', 'Losses'],
    datasets: [{
      data: [
        trades.filter(t => (t.pnl || 0) > 0).length,
        trades.filter(t => (t.pnl || 0) < 0).length,
      ],
      backgroundColor: ['#00ff00', '#ff0000'],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#ffffff',
        bodyColor: '#b0b0b0',
        borderColor: '#333333',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: '#333333' },
        ticks: { color: '#b0b0b0' },
      },
      y: {
        grid: { color: '#333333' },
        ticks: { color: '#b0b0b0' },
        callback: (value: any) => `${value.toFixed(2)} BTC`,
      },
    },
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-800 rounded-xl"></div>
            <div className="h-96 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-heading mb-8 text-accent-green">
        Performance Analytics
      </h1>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-green mb-2">
            +{performance?.totalROI}%
          </div>
          <div className="text-text-secondary">Total ROI</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-green mb-2">
            {performance?.winRate}%
          </div>
          <div className="text-text-secondary">Win Rate</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-red mb-2">
            {performance?.maxDrawdown}%
          </div>
          <div className="text-text-secondary">Max Drawdown</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-blue mb-2">
            {performance?.sharpeRatio}
          </div>
          <div className="text-text-secondary">Sharpe Ratio</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold font-heading mb-4 text-accent-green">
            Equity Curve
          </h2>
          <div className="h-80">
            <Line data={equityCurveData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold font-heading mb-4 text-accent-green">
            Win/Loss Distribution
          </h2>
          <div className="h-80 flex items-center justify-center">
            <Pie data={winLossData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: '#b0b0b0' },
                },
                tooltip: {
                  backgroundColor: '#1a1a1a',
                  titleColor: '#ffffff',
                  bodyColor: '#b0b0b0',
                },
              },
            }} />
          </div>
        </div>
      </div>

      {/* Trade History Table */}
      <div className="card">
        <h2 className="text-xl font-bold font-heading mb-4 text-accent-green">
          Trade History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-color">
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Type</th>
                <th className="text-left py-2 px-4">Entry</th>
                <th className="text-left py-2 px-4">Exit</th>
                <th className="text-left py-2 px-4">P&L</th>
                <th className="text-left py-2 px-4">ROI</th>
                <th className="text-left py-2 px-4">DCA</th>
              </tr>
            </thead>
            <tbody>
              {trades.slice(0, 20).map((trade) => (
                <tr key={trade.id} className="border-b border-border-color">
                  <td className="py-2 px-4">
                    {new Date(trade.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <span className={`font-semibold ${trade.side === 'long' ? 'text-accent-green' : 'text-accent-red'}`}>
                      {trade.side.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 px-4">${trade.entryPrice.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    {trade.exitPrice ? `$${trade.exitPrice.toLocaleString()}` : '-'}
                  </td>
                  <td className={`py-2 px-4 font-semibold ${(trade.pnl || 0) > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {(trade.pnl || 0) > 0 ? '+' : ''}{(trade.pnl || 0).toFixed(4)} BTC
                  </td>
                  <td className={`py-2 px-4 font-semibold ${(trade.pnlPercentage || 0) > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {(trade.pnlPercentage || 0) > 0 ? '+' : ''}{(trade.pnlPercentage || 0).toFixed(2)}%
                  </td>
                  <td className="py-2 px-4">
                    {trade.dcaUsed > 0 ? `${trade.dcaUsed}x` : 'None'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
