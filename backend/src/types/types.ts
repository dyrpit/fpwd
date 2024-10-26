export const BASE_CURRENCY = {
  EUR: 'EUR',
} as const;

export type BaseCurrency = (typeof BASE_CURRENCY)[keyof typeof BASE_CURRENCY];

export const EXCHANGE_CURRENCY = {
  PLN: 'PLN',
} as const;

export type ExchangeCurrency =
  (typeof EXCHANGE_CURRENCY)[keyof typeof EXCHANGE_CURRENCY];

export type ZodValidationError = { path: (string | number)[]; cause: string };

export type ExchangeApiResponse = { exchange_rate: number };

export type Transaction = {
  baseAmount: number;
  exchangedAmount: number;
  rate: number;
  timestamp: Date;
};
