import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  FieldValues, UseFormReset } from 'react-hook-form';

import { convertCurrency, getExchangeRate } from '../api/exchange.api';

import { TRANSACTION_QUERY_KEY } from './transaction.query';


export const EXCHANGE_QUERY_KEY = 'exchangeRate';

export function useExchangeRate() {
  const { isError, ...query } = useQuery({
    queryKey: [EXCHANGE_QUERY_KEY],
    queryFn: getExchangeRate,
    refetchInterval: 60000, // Refetch every minute
  });

  useEffect(() => {
    if (isError) {
      toast.error('Could not fetch exchange rate');
    }
  }, [isError]);

  return query;
}

export function useConvert<T extends FieldValues>(reset: UseFormReset<T>) {
  const queryClient = useQueryClient();
  const { isError, ...result } = useMutation({
    mutationFn: (amount: number) => convertCurrency(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEY] });
      reset();
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error('Could not exchange currency');
    }
  }, [isError]);

  return result;
}
