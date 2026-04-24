import React from 'react';
import type { Transaction } from '../types';
import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';
import './TransactionList.css';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.date]) {
      acc[transaction.date] = [];
    }
    acc[transaction.date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  // Sort dates descending
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (transactions.length === 0) {
    return (
      <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="empty-state">
          <p>No transactions yet. Add one to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel transaction-list-container animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {sortedDates.map((date) => (
        <div key={date} className="date-group">
          <div className="date-header">{formatDateLabel(date)}</div>
          
          {groupedTransactions[date].map((t) => (
            <div key={t.id} className="transaction-item">
              <div className="item-left">
                <div className={`item-icon ${t.type}`}>
                  {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div className="item-details">
                  <h4>{t.title}</h4>
                  <p>{t.category}</p>
                </div>
              </div>
              
              <div className="item-right">
                <span className={`item-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteTransaction(t.id)}
                  title="Delete Transaction"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
