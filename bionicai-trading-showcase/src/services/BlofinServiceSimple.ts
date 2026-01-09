// Simplified Blofin Service for testing
export interface BlofinPosition {
  instId: string;
  symbol: string;
  side: 'long' | 'short';
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unrealizedPnl: string;
  percentage: string;
  leverage: string;
  uTime: number;
}

export interface BlofinPerformance {
  totalROI: number;
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  avgWin: number;
  avgLoss: number;
  totalPnL: number;
  currentBalance: number;
}

export class BlofinServiceSimple {
  async getPositions(): Promise<BlofinPosition[]> {
    // Mock implementation for now
    return this.getMockPositions();
  }

  async getPerformance(): Promise<BlofinPerformance> {
    // Mock implementation for now
    return this.getMockPerformance();
  }

  async getTradeHistory(): Promise<any[]> {
    // Mock implementation for now
    return this.getMockTradeHistory();
  }

  private getMockPositions(): BlofinPosition[] {
    return [
      {
        instId: '123456789',
        symbol: 'BTCUSDT',
        side: 'long',
        positionAmt: '0.200',
        entryPrice: '67500.000000',
        markPrice: '68750.000000',
        unrealizedPnl: '250.000000',
        percentage: '1.8519',
        leverage: '10',
        uTime: Date.now()
      },
      {
        instId: '987654321',
        symbol: 'BTCUSDT',
        side: 'short',
        positionAmt: '0.200',
        entryPrice: '68000.000000',
        markPrice: '68750.000000',
        unrealizedPnl: '-300.000000',
        percentage: '-2.2059',
        leverage: '10',
        uTime: Date.now() - 4 * 60 * 60 * 1000
      }
    ];
  }

  private getMockPerformance(): BlofinPerformance {
    return {
      totalROI: 127.5,
      winRate: 73.2,
      totalTrades: 47,
      profitFactor: 2.34,
      maxDrawdown: 15.8,
      sharpeRatio: 1.89,
      avgWin: 8.7,
      avgLoss: -3.2,
      totalPnL: 25.5,
      currentBalance: 45.5
    };
  }

  private getMockTradeHistory(): any[] {
    const trades = [];
    const now = Date.now();
    
    for (let i = 0; i < 50; i++) {
      const timestamp = now - (i * 24 * 60 * 60 * 1000);
      const isWin = Math.random() > 0.27;
      const entryPrice = 60000 + Math.random() * 15000;
      const pnlPercentage = (Math.random() * 15 + 2) * (isWin ? 1 : -1);
      
      trades.push({
        id: `trade_${i}`,
        symbol: 'BTCUSDT',
        side: Math.random() > 0.5 ? 'long' : 'short',
        size: 0.2,
        entryPrice,
        pnl: entryPrice * (pnlPercentage / 100) * 0.2,
        pnlPercentage,
        timestamp,
        status: 'closed',
        leverage: 10,
        dcaUsed: Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0
      });
    }
    
    return trades;
  }
}
