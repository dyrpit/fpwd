import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { convertCurrency } from '@/services/api/exchange.api';

const exchangeSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
});

type ExchangeFormData = z.infer<typeof exchangeSchema>;


export default function ExchangeForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExchangeFormData>({
    resolver: zodResolver(exchangeSchema),
  });

  const conversion = useMutation({
    mutationFn: (amount: number) => convertCurrency(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      reset();
    },
  });

  const onSubmit = (data: ExchangeFormData) => {
    conversion.mutate(data.amount);
  };

  return (
    <div className='max-w-md'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='block mb-2'>Amount in EUR</label>
          <input
            type='number'
            step='0.01'
            className='w-full p-2 border rounded'
            {...register('amount', {
              valueAsNumber: true,
              required: 'Amount is required',
            })}
          />
          {errors.amount && <p className='text-red-500 text-sm mt-1'>{errors.amount.message}</p>}
        </div>

        <button
          type='submit'
          disabled={conversion.isPending}
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
        >
          {conversion.isPending ? 'Converting...' : 'Convert to PLN'}
        </button>
      </form>

      {conversion.isSuccess && (
        <div className='mt-4 p-4 bg-green-100 rounded'>
          <h2 className='font-bold mb-2'>Conversion Result:</h2>
          <p>EUR Amount: {conversion.data.baseAmount}</p>
          <p>PLN Amount: {conversion.data.exchangedAmount.toFixed(2)}</p>
          <p>Rate Used: {conversion.data.rate}</p>
          <p>Timestamp: {new Date(conversion.data.timestamp).toLocaleString()}</p>
        </div>
      )}

      {conversion.isError && (
        <div className='mt-4 p-4 bg-red-100 rounded'>
          <p className='text-red-600'>Error occurred during conversion. Please try again.</p>
        </div>
      )}
    </div>
  );
}
