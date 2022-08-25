import "src/styles/global.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

const App = (props: AppProps) => {
  return (
    <>
      <DefaultSeo
        defaultTitle="デフォルトのタイトル"
        description="デフォルトの説明"
        openGraph={{
          type: "website",
          title: "デフォルトのタイトル",
          description: "デフォルトの説明",
          // eslint-disable-next-line @typescript-eslint/naming-convention
          site_name: "サイトの名前",
          url: "サイトのURL",
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <props.Component {...props.pageProps} />
    </>
  );
};
export default App;
