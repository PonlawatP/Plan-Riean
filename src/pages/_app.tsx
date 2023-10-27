import { AppProps } from "next/app";
import './globals.css'
import Layout from "@/components/layouts";
import Script from "next/script";
// import GoogleAnalytics from "@/GoogleAnalytics";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function MyApp({Component, pageProps}: AppProps){
        return <Layout>
            <GoogleAnalytics strategy="lazyOnload" trackPageViews={true} />
            <Component {...pageProps}/>
        </Layout>
}