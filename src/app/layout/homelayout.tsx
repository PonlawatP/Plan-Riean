import { IBM_Plex_Sans_Thai } from 'next/font/google';

export const font = IBM_Plex_Sans_Thai({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <div className={`${font.className}`} >
          {children}
        </div>
      </>
  );
}
