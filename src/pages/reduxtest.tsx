import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "src/components/layout/layout";
import counterSlice from "src/modules/slice/counterSlice";

const Reduxtest: NextPage = () => {
  const dispatch = useDispatch();

  // state の取得
  const counter = useSelector((state: any) => {
    return state.counter;
  });

  const handleIncrement = () => {
    return dispatch(counterSlice.actions.increment(null));
  };

  const handleDecrement = () => {
    return dispatch(counterSlice.actions.decrement(null));
  };

  return (
    <Layout>
      <NextSeo
        title="リダックステスト"
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
      <h2>李ダックス</h2>
      <div>
        <p>{counter}</p>
        <button onClick={handleIncrement}>increment</button>
        <button onClick={handleDecrement}>decrement</button>
      </div>
    </Layout>
  );
};

export default Reduxtest;
