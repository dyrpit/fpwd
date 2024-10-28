import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/services/api/exchange.api';

export default function TransactionHistory() {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (isError) {
    return <div>Error loading transactions</div>;
  }

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
            {transactions &&
              transactions.map((transaction, index) => (
                <tr key={index} className='border-t'>
                  <td className='px-6 py-4'>{transaction.eurAmount}</td>
                  <td className='px-6 py-4'>{transaction.plnAmount.toFixed(2)}</td>
                  <td className='px-6 py-4'>{transaction.rate}</td>
                  <td className='px-6 py-4'>{new Date(transaction.timestamp).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
