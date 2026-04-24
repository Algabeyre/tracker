import React from 'react';
import type { SummaryData } from '../types';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import './SummaryCards.css';

interface SummaryCardsProps {
  data: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="summary-grid animate-fade-in">
      <div className="glass-panel summary-card">
        <div className="icon-wrapper icon-balance">
          <Wallet size={28} />
        </div>
        <div className="summary-info">
          <h3>Total Balance</h3>
          <p>{formatCurrency(data.balance)}</p>
        </div>
      </div>

      <div className="glass-panel summary-card">
        <div className="icon-wrapper icon-income">
          <TrendingUp size={28} />
        </div>
        <div className="summary-info">
          <h3>Total Income</h3>
          <p>{formatCurrency(data.income)}</p>
        </div>
      </div>

      <div className="glass-panel summary-card">
        <div className="icon-wrapper icon-expense">
          <TrendingDown size={28} />
        </div>
        <div className="summary-info">
          <h3>Total Expenses</h3>
          <p>{formatCurrency(data.expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
