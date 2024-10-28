import { ExchangeRate, Transaction } from '@/types/types';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4500';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getExchangeRate = async (): Promise<ExchangeRate> => {
  const { data } = await api.post('/exchange/rates', { base: 'EUR', exchange: 'PLN' });
  return data;
};

export const convertCurrency = async (amount: number): Promise<Transaction> => {
  const { data } = await api.post('/exchange/convert', { amount });
  return data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get('/exchange/transactions');
  return data;
};
