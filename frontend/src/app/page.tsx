'use client';
import ExchangeForm from '@/components/exchange-form';
import ExchangeRate from '@/components/exchange-rates';
import Navbar from '@/components/navbar';
import TransactionHistory from '@/components/transaction-history';

export default function Home() {
  return (
    <main className=' pb-8 h-screen flex-row justify-center items-center'>
      <Navbar />
      <article className='2xl:container mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-8'>Currency Exchange</h1>
        <ExchangeRate />
        <ExchangeForm />
        <TransactionHistory />
      </article>
    </main>
  );
}
