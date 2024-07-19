import Header from '@/components/header/Header.jsx';
import Footer from '@/components/footer/Footer.jsx';

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
