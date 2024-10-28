import { ExchangeRate, Transaction } from '@/types/types';
import { axiosClient } from './config.api';

export const getExchangeRate = async (): Promise<ExchangeRate> => {
  const { data } = await axiosClient.post('/exchange/rates', {
    base: 'EUR',
    exchange: 'PLN',
  });
  return data;
};

export const convertCurrency = async (amount: number): Promise<Transaction> => {
  const { data } = await axiosClient.post('/exchange', {
    exchangeValue: amount,
    base: 'EUR',
    exchange: 'PLN',
  });
  return data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const { data } = await axiosClient.get('/exchange/transactions');
  console.log('data', data);
  return data;
};
