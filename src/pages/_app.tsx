import { AppProps } from "next/app";
import './globals.css'
import Layout from "@/components/layouts";
import Script from "next/script";
// import GoogleAnalytics from "@/GoogleAnalytics";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ThemeContext } from "@/providers";
import { useState } from "react";
import Head from "next/head";

export default function MyApp({Component, pageProps}: AppProps){
    const [theme, setTheme] = useState('day');

    return <ThemeContext.Provider value={{theme,setTheme}}>
                <Layout>
                   <GoogleAnalytics strategy="lazyOnload" trackPageViews={true} />
                   <Component {...pageProps}/>
                </Layout>
    </ThemeContext.Provider>
}