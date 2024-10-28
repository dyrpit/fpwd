import { useQuery } from '@tanstack/react-query';
import { getExchangeRate } from '../api/exchange.api';

const EXCHANGE_QUERY_KEY = 'exchangeRate';

export function useExchangeRate() {
  return useQuery({
    queryKey: [EXCHANGE_QUERY_KEY],
    queryFn: getExchangeRate,
    refetchInterval: 60000, // Refetch every minute
  });
}
