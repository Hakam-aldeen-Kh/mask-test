import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";

// sections
import Header from "@/components/common/sections/Header";
import Footer from "@/components/common/sections/Footer";

// baseUrl
import { baseUrl } from '@/utils/baseUrl';

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"], // Include the font weights you need
});


// metadata
export const metadata: Metadata = {

  title: {
    default: "中古機械、電動工具の高額買取のハディズ",
    template: "%s | mac-hadis",
  },

  description: "中古機械、電動工具の高額買取ならハディズへ。ハディズでは、業務用機器の買取を「全国対応」で行っています。専門のバイヤーが購入するので、高値で売却が可能です。ぜひ、1度御見積りをお願いします",

  applicationName: "mac-hadis",

  generator: "Next.js",

  keywords: ["大型UVインクジェットプリンター買取", "機械・電動工具の高価買取", "簡単！買取の手順", "Hadis INTERNATIONAL"],

  referrer: "origin",

  creator: "mac-hadis",

  publisher: "mac-hadis",

  // robots: "index, follow",

  alternates: {
    canonical: baseUrl
  },

  openGraph: {
    type: "website",
    url: baseUrl,
    title: "中古機械、電動工具の高額買取のハディズ",
    description: "中古機械、電動工具の高額買取ならハディズへ。ハディズでは、業務用機器の買取を「全国対応」で行っています。専門のバイヤーが購入するので、高値で売却が可能です。ぜひ、1度御見積りをお願いします！",
    siteName: "mac-hadis",
    images: [
      { url: "https://remocolla.odoo.com/web/image/website/1/logo?unique=825752b" }
    ]
  },

  twitter: {
    card: "summary_large_image",
    description: "中古機械、電動工具の高額買取ならハディズへ。ハディズでは、業務用機器の買取を「全国対応」で行っています。専門のバイヤーが購入するので、高値で売却が可能です。ぜひ、1度御見積りをお願いします！",
    title: "中古機械、電動工具の高額買取のハディズ",
    images: "https://remocolla.odoo.com/web/image/website/1/logo?unique=825752b"
  },

  // verification: {
  //   google: "google-verification-token",
  // },

  category: "Sells",

  classification: "Sells",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body
        className={`${notoSansJP.variable} font-noto`}
      >
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}