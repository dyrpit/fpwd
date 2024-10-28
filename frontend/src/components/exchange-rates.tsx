// import { useQuery } from '@tanstack/react-query';
// import { getExchangeRate } from '@/services/api/exchange.api';
import { useExchangeRate } from '@/services/queries/exchange.query';
import Spinner from './spinner';

export default function ExchangeRate() {
  const { data, isLoading } = useExchangeRate();

  return (
    <div>
      <div className='flex justify-center text-lg text-gray-50'>
        <p>Current EUR to PLN rate:</p>
        {isLoading ? <Spinner /> : <strong>{data && data.rate.toFixed(4)}</strong>}
      </div>
    </div>
  );
}
