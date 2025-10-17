import "./globals.css";
import { Figtree } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NextAuthSessionProvider from "./providers/sessionProvider.js";
import Newsletter from "./components/form/Newsletter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getNewsletter } from "@/lib/getRecipes";
import { sampleNewsletter } from '@/lib/sampleData';
const figtree = Figtree({ subsets: ["latin"] });
import * as Sentry from '@sentry/nextjs';


// Add or edit your "generateMetadata" to include the Sentry trace data:
const metadata = {
  title: "Tony Thyme",
  description: "Recipe Blog",
};
export function generateMetadata() {
  return {
    // ... your existing metadata
    metadata,
    other: {
      ...Sentry.getTraceData()
    }
  };
}

export const revalidate = 200;
export default async function RootLayout({ children }) {
  const newsletter = await getNewsletter().catch(() => null);
  const modalCollection = newsletter?.modalCollection;
  let NLContent = modalCollection?.items?.[0] ?? null;
  // If running in a preview and Contentful is not configured, fall back to sample data
  if (!NLContent) NLContent = sampleNewsletter;
  return (
    <html lang="en" className="m-0" style={{scrollBehavior:"smooth"}}>
      <body
        className={
          figtree.className +
          " overflow-y-scroll scrollbar-hide bg-base-200 text-base-content m-0 w-100"
        }
      >
        <NextAuthSessionProvider>
            <Header />
            {children}
            <Newsletter content={NLContent} />
            <Footer />
        </NextAuthSessionProvider>
        <GoogleAnalytics gaId="G-WH0DGBWN2D" />
      </body>
    </html>
  );
}
