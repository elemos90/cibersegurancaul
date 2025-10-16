import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Portal de Cibersegurança UniLicungo",
  description: "Governança e operações de cibersegurança — UniLicungo",
  icons: {
    icon: [
      { url: '/logo_unilicungo.png', sizes: 'any', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/logo_unilicungo.png',
    shortcut: '/logo_unilicungo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/logo_unilicungo.png" type="image/png" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
