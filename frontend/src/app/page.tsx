'use client';
import ExchangeForm from '@/components/exchange-form';
import Navbar from '@/components/navbar';
import TransactionHistory from '@/components/transaction-history';

export default function Home() {
  return (
    <main className='pb-8 h-screen'>
      <Navbar />
      <article className='flex justify-center xl:container mx-auto p-4'>
        <div className='p-4'>
          <h1 className='text-3xl text-center font-bold mb-8'>
            Currency Exchange
          </h1>
          <ExchangeForm />
          <TransactionHistory />
        </div>
      </article>
    </main>
  );
}
