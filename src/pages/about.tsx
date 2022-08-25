import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "src/components/layout/layout";

const About: NextPage = () => {
  return (
    <Layout>
      <NextSeo
        title="ページのタイトル"
        description="ページの説明"
        openGraph={{
          url: "ページのURL",
          title: "ページのタイトル",
          description: "ページの説明",
          images: [
            {
              url: "https://www.example.ie/og-image-02.jpg",
            },
          ],
        }}
      />
      <h2>About</h2>
    </Layout>
  );
};

export default About;
