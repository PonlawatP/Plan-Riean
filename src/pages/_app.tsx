import { AppProps } from "next/app";
import './globals.css'
import Layout from "@/pages/plan/layout";
import Script from "next/script";
// import GoogleAnalytics from "@/GoogleAnalytics";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ThemeContext } from "@/app/providers";
import { useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import AuthProvider from "@/app/providers/AuthProvider";

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
  }
  
  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
  }

export default function MyApp({Component, pageProps}: AppProps){
    const [theme, setTheme] = useState('light');

    const getLayout = Component.getLayout ?? ((page) => page)


    return <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    {/* return <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <AuthProvider>
            <GoogleAnalytics strategy="lazyOnload" trackPageViews={true} />
            {getLayout(<Component {...pageProps} />)}
            {/* <Component {...pageProps} /> */}
        </AuthProvider>
    </ThemeProvider>
}
