import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Top Shot · Round 2 Reactivation Review",
  description: "Swipe through the May 4–10 reactivation play. Tell us what ships and what doesn't.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
