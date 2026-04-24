export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO format string
}

export interface SummaryData {
  balance: number;
  income: number;
  expense: number;
}
