import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from './components/Header/Header';
import LogoIcon from './components/LogoIcon/LogoIcon';
import LogoText from './components/LogoText/LogoText';

const quicksand = localFont({
  src: './fonts/Quicksand-VariableFont_wght.ttf',
  variable: '--font-quicksand',
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
      <body className={`${quicksand.variable} antialiased defaults`}>
        <Header>
          <LogoIcon />
          <LogoText />
        </Header>
        {children}
      </body>
    </html>
  );
}
