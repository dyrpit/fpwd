export type ExchangeRate = {
  rate: number;
};

export type Transaction = {
  baseAmount: number;
  exchangedAmount: number;
  rate: number;
  timestamp: string;
};
