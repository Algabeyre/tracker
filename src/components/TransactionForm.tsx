import React, { useEffect, useState } from 'react';
import type { Transaction, TransactionType } from '../types';
import { PlusCircle } from 'lucide-react';
import './TransactionForm.css';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editingTransaction?: Transaction | null;
  onUpdateTransaction?: (transaction: Transaction) => void;
  onCancelEdit?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount.toString());
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      resetForm();
    }
  }, [editingTransaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) return;

    const transactionData = {
      title,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    if (editingTransaction && onUpdateTransaction) {
      onUpdateTransaction({
        ...editingTransaction,
        ...transactionData,
      });
    } else {
      onAddTransaction(transactionData);
    }

    resetForm();
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="form-header">
        <PlusCircle className="text-accent-primary" size={24} color="#3b82f6" />
        <h2>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn income ${type === 'income' ? 'active' : ''}`}
            onClick={() => setType('income')}
          >
            Income
          </button>
          <button
            type="button"
            className={`type-btn expense ${type === 'expense' ? 'active' : ''}`}
            onClick={() => setType('expense')}
          >
            Expense
          </button>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Salary, Groceries"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select Category</option>
            {type === 'expense' ? (
              <>
                <option value="Food">Food & Dining</option>
                <option value="Grocery">Grocery</option>
                <option value="Transport">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Shopping">Shopping</option>
                <option value="Telecom">Telecom</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investments">Investments</option>
                <option value="Gift">Gift</option>
                <option value="Other">Other</option>
              </>
            )}
          </select>
        </div>

        <div className="action-buttons-row">
          <button type="submit" className="submit-btn">
            {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
          </button>
          {editingTransaction && onCancelEdit && (
            <button type="button" className="cancel-btn" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
