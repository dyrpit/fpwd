import ExchangeRate from './exchange-rates';

function Navbar() {
  return (
    <nav className='bg-gray-800'>
      <div className='flex items-center sm:justify-end justify-center h-16 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <ExchangeRate />
      </div>
    </nav>
  );
}

export default Navbar;
