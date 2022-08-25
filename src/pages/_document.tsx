import type { DocumentContext } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";

class DocumentTsx extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentTsx;
