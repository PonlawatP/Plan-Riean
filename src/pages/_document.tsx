import Document, { Html, Head, Main, NextScript } from 'next/document';
import { SpeedInsights } from '@vercel/speed-insights/next';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/icon-inv.png" type="image/png" sizes="192x192" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="theme-color" content="#E6EDF3" />
          <meta
            name="description"
            content="บอกลาความปวดหัวกับการจัดตารางเรียนไปได้เลย! แพลนเรียน จะมาทำให้การจัดตารางเรียน, วางแผนการเรียนของคุณเป็นเรื่องง่ายและสนุกกว่าเดิม"
          />
          <meta
            name="keywords"
            content="จัดตารางเรียน, แผนการเรียน, ตัวช่วยนักศึกษา, เครื่องมือจัดตารางเรียน, วางแผนการเรียน, Planriean, ตารางเรียน"
          ></meta>

          <meta property="og:title" content="จัดตารางเรียนสุดง่ายด้วยแพลนเรียน!" />
          <meta property="og:image" content="/assets/images/thumbnail.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <SpeedInsights />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
