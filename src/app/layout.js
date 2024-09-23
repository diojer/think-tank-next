import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

//Font imports
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { Domine } from "next/font/google";

//FontAwesome imports
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inter",
});
const poppinsLight = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins-light",
});
const poppinsBold = Poppins({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-poppins-bold",
});
const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
});

//Auth
import { ClerkProvider } from "@clerk/nextjs";

//Analytics
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'



export const metadata = {
  title: "LPI - Leeds Policy Institute",
  description:
    "Leeds Policy Institute (LPI) is a student-led and student-run think tank dedicated to undertaking empirically driven research and non-partisan policy that centres on both local and national issues.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ClerkProvider>
        <html
          lang="en"
          className={`${inter.variable} ${poppinsLight.variable} ${poppinsBold.variable} ${domine.variable}`}
        >
          <body>
            <Navbar />
            <div className="page-wrapper">
              {children}
            </div>
            <Footer />
          </body>
          <GoogleAnalytics gaId="G-XL199P0DZ7" />
          <SpeedInsights />
          <Analytics />
        </html>
      </ClerkProvider>
    </>
  );
}
