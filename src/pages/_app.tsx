import { AppProps } from "next/app";
import './globals.css'
import Layout from "@/app/layouts";
import Script from "next/script";
// import GoogleAnalytics from "@/GoogleAnalytics";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ThemeContext } from "@/app/providers";
import { useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

export default function MyApp({Component, pageProps}: AppProps){
    const [theme, setTheme] = useState('light');

    return <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    {/* return <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <Layout>
            <GoogleAnalytics strategy="lazyOnload" trackPageViews={true} />
            <Component {...pageProps}/>
        </Layout>
    </ThemeProvider>
}