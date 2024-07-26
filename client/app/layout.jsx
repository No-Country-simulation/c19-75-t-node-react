import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from '@/context/SessionContext';

import '@/styles/globals.scss';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <Header />
                    <main>{children}</main>
                </SessionProvider>
                <Footer />
            </body>
        </html>
    );
}
