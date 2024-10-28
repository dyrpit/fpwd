import { QueryProvider } from '@/providers/query-provider';
import type { Metadata } from 'next';

import { ToastContainer } from 'react-toastify';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Exhcnage App',
  description: 'Simple exchange app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <ToastContainer
          position='top-left'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme='dark'
          limit={1}
        />
      </body>
    </html>
  );
}
