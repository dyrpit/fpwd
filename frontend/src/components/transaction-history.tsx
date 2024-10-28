import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/services/api/exchange.api';
import Spinner from './spinner';

export default function TransactionHistory() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Transaction History</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='px-6 py-3 text-left'>EUR Amount</th>
              <th className='px-6 py-3 text-left'>PLN Amount</th>
              <th className='px-6 py-3 text-left'>Rate</th>
              <th className='px-6 py-3 text-left'>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <Spinner />}
            {data &&
              data.map((transaction) => (
                <tr key={transaction.timestamp} className='border-t'>
                  <td className='px-6 py-4'>{transaction.baseAmount}</td>
                  <td className='px-6 py-4'>
                    {transaction.exchangedAmount.toFixed(2)}
                  </td>
                  <td className='px-6 py-4'>{transaction.rate}</td>
                  <td className='px-6 py-4'>
                    {new Date(transaction.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
