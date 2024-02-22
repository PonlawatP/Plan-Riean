import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="icon"
            href="/icon-inv.png"
            type="image/png"
            sizes="192x192"
            />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#E6EDF3" />
          <meta name="description" content="ไม่รู้จะจัดตารางเรียนยังไง มาลองทำให้ง่ายขึ้นด้วย Planriean สิ, ตารางเรียน, แผนการเรียน, ตัวช่วยนักศึกษา" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;