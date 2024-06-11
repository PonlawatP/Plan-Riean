import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/icon-inv.png" type="image/png" sizes="192x192" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#E6EDF3" />
          <meta
            name="description"
            content="บอกลาความปวดหัวกับการจัดตารางเรียนไปได้เลย! Planriean จะมาทำให้การจัดตารางเรียน, วางแผนการเรียนของคุณเป็นเรื่องง่ายและสนุกกว่าเดิม"
          />
          <meta
            name="keywords"
            content="จัดตารางเรียน, แผนการเรียน, ตัวช่วยนักศึกษา, เครื่องมือจัดตารางเรียน, วางแผนการเรียน, Planriean, ตารางเรียน"
          ></meta>
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
