import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../api/exchange.api';
import { toast } from 'react-toastify';

export const TRANSACTION_QUERY_KEY = 'transactions';

export function useTransaction() {
  const { isError, ...query } = useQuery({
    queryKey: [TRANSACTION_QUERY_KEY],
    queryFn: getTransactions,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Could not fetch transactions');
    }
  }, [isError]);

  return query;
}
