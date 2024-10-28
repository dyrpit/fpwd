import { useExchangeRate } from '@/services/queries/exchange.query';

import Spinner from './spinner';

export default function ExchangeRate() {
  const { data, isLoading } = useExchangeRate();

  return (
    <div className='flex text-lg text-gray-50'>
      <p className='px-4'>Current EUR to PLN rate:</p>
      {isLoading ? (
        <Spinner />
      ) : (
        <strong>{data && data.rate.toFixed(4)}</strong>
      )}
    </div>
  );
}
