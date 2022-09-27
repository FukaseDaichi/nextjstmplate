import "src/styles/global.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import { setupStore } from "src/modules/store";

const store = setupStore();

const App = (props: AppProps) => {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
};
export default App;
