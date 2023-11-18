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
                <Head>
                    <meta name="theme-color" content="#253445"/>
                    <meta name="description" content="จัดตารางเรียนให้ง่ายขึ้นด้วย Planriean, แผนการเรียน, ตัวช่วยนักศึกษา" />
                </Head>
                <Layout>
                   <GoogleAnalytics strategy="lazyOnload" trackPageViews={true} />
                   <Component {...pageProps}/>
                </Layout>
    </ThemeContext.Provider>
}