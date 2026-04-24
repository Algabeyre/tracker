import React, { useState, useEffect } from 'react';
import type { Transaction, SummaryData } from '../types';
import SummaryCards from './SummaryCards';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import ExpenseChart from './ExpenseChart';

// Initial dummy data to make it look stunning from the start
const INITIAL_DATA: Transaction[] = [
  { id: '1', title: 'Salary', amount: 5000, type: 'income', category: 'Salary', date: new Date().toISOString().split('T')[0] },
  { id: '2', title: 'Groceries', amount: 120.50, type: 'expense', category: 'Food', date: new Date().toISOString().split('T')[0] },
  { id: '3', title: 'Electric Bill', amount: 85.00, type: 'expense', category: 'Utilities', date: new Date(Date.now() - 86400000).toISOString().split('T')[0] }, // Yesterday
  { id: '4', title: 'Freelance', amount: 800, type: 'income', category: 'Freelance', date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] },
  { id: '5', title: 'Dinner out', amount: 65.00, type: 'expense', category: 'Food', date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] },
];

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('budget_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse transactions from local storage', e);
      }
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('budget_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const summaryData: SummaryData = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') {
        acc.income += curr.amount;
        acc.balance += curr.amount;
      } else {
        acc.expense += curr.amount;
        acc.balance -= curr.amount;
      }
      return acc;
    },
    { balance: 0, income: 0, expense: 0 }
  );

  return (
    <div className="dashboard-wrapper">
      <SummaryCards data={summaryData} />
      
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="main-content">
          <TransactionList 
            transactions={transactions} 
            onDeleteTransaction={deleteTransaction} 
          />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <TransactionForm onAddTransaction={addTransaction} />
          <ExpenseChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
