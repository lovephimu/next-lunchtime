import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const qwitcherReg = localFont({
  src: './fonts/QwitcherGrypen-Regular.ttf',
  variable: '--font-qwitcher-reg',
});
const qwitcherBold = localFont({
  src: './fonts/QwitcherGrypen-Bold.ttf',
  variable: '--font-qwitcher-bold',
});
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
      <body className={`${quicksand.variable} antialiased`}>{children}</body>
    </html>
  );
}
