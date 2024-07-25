import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HeaderProvider } from '@/context/HeaderContext';

import '@/styles/globals.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderProvider>
          <Header />
          <main>{children}</main>
        </HeaderProvider>
        <Footer />
      </body>
    </html>
  );
}
