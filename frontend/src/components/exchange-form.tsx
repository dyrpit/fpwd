import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useConvert } from '@/services/queries/exchange.query';
import Spinner from './spinner';

const exchangeSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
});

type ExchangeFormData = z.infer<typeof exchangeSchema>;

export default function ExchangeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExchangeFormData>({
    resolver: zodResolver(exchangeSchema),
  });

  const { mutate, isPending, isSuccess, data } =
    useConvert<ExchangeFormData>(reset);

  const onSubmit = (data: ExchangeFormData) => {
    mutate(data.amount);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='block mb-2'>Amount in EUR</label>
          <input
            type='number'
            step='0.01'
            min='1'
            className='w-full p-2 border rounded'
            {...register('amount', {
              valueAsNumber: true,
              required: 'Amount is required',
            })}
          />
          {errors.amount && (
            <p className='text-red-500 text-sm mt-1'>{errors.amount.message}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
        >
          {isPending ? <Spinner /> : 'Convert to PLN'}
        </button>
      </form>

      {isSuccess && (
        <div className='mt-4 p-4 bg-green-100 rounded'>
          <h2 className='font-bold mb-2'>Conversion Result:</h2>
          <p>EUR Amount: {data.baseAmount}</p>
          <p>PLN Amount: {data.exchangedAmount.toFixed(2)}</p>
          <p>Rate Used: {data.rate}</p>
          <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
