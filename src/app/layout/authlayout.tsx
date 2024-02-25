import { IBM_Plex_Sans_Thai } from 'next/font/google';

export const font = IBM_Plex_Sans_Thai({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

export default function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <style jsx global>{`
            :root {
              --toastify-font-family: ${font.style.fontFamily};
            }
            body {
              touch-action: none;
              overflow: hidden;
            }
        `}</style>
        <div className={`${font.className}`} >
          {children}
        </div>
      </>
  );
}
