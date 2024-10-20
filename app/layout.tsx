import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import Container from './components/Container';
import Header from './components/Header';
import LogoIcon from './components/LogoIcon/LogoIcon';
import LogoText from './components/LogoText';
import Menu from './components/Menu';
import Page from './components/Page';

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

export default async function RootLayout({
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
          <Menu />
        </Header>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
