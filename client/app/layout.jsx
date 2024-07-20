import Header from '@/components/Header';
import Footer from '@/components/Footer';

import '@/styles/globals.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
