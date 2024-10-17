import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import Button from './components/Button';
import Container from './components/Container';
import FormMiniLogin from './components/FormMiniLogin';
import Header from './components/Header';
import LogoIcon from './components/LogoIcon/LogoIcon';
import LogoText from './components/LogoText';

const quicksand = localFont({
  src: './fonts/Quicksand-VariableFont_wght.ttf',
  variable: '--font-quicksand',
  weight: '1 999',
});

const bodoniModa = localFont({
  src: './fonts/BodoniModa-VariableFont_opsz,wght.ttf',
  variable: '--font-roboto-serif',
  weight: '1 999',
});

export const metadata: Metadata = {
  title: 'LunchTime',
  description: 'Tracking meals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoniModa.variable} ${quicksand.variable} antialiased defaults`}
      >
        <Header>
          <FormMiniLogin />
          <Container>
            <Link href="/">
              <Container direction="column" gap="large">
                <LogoIcon />
                <LogoText />
              </Container>
            </Link>
          </Container>
        </Header>
        {children}
      </body>
    </html>
  );
}
