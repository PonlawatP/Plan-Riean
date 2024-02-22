import AuthProvider from '@/app/providers/AuthProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { IBM_Plex_Sans_Thai } from 'next/font/google';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export const font = IBM_Plex_Sans_Thai({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className={font.className} >
        {children}
      </div>
  );
}
