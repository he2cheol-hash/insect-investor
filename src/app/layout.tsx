import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ADSENSE_CLIENT, SITE } from "@/lib/constants";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — 내 투자 멘탈은 어떤 곤충?`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — 내 투자 멘탈은 어떤 곤충?`,
    description: SITE.description,
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — 내 투자 멘탈은 어떤 곤충?`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  // AdSense 사이트 확인용 메타 (퍼블리셔 ID 설정 시에만 출력)
  ...(ADSENSE_CLIENT
    ? { other: { "google-adsense-account": ADSENSE_CLIENT } }
    : {}),
};

export const viewport: Viewport = {
  // 라이트 디자인 고정 — 자동 다크 반전으로 인한 가독성 깨짐 방지
  colorScheme: "light",
  themeColor: "#faf9f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
