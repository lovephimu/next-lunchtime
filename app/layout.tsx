import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import Button from './components/Button';
import Container from './components/Container';
import Header from './components/Header/Header';
import LogoIcon from './components/LogoIcon/LogoIcon';
import LogoText from './components/LogoText/LogoText';

const quicksand = localFont({
  src: './fonts/Quicksand-VariableFont_wght.ttf',
  variable: '--font-quicksand',
  weight: '400',
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
          <Container between="right">
            <Button as="link" label={<div>Login/Logout</div>} href="/login" />
          </Container>
          <Container>
            <Link href="/">
              <Container direction="column">
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
