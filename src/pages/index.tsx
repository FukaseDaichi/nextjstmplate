import type { NextPage } from "next";
import { Layout } from "src/components/layout/layout";

const Home: NextPage = () => {
  const handleClick = () => {
    window.alert(process.env.NEXT_PUBLIC_SKYWAY_API_KEY);
  };

  return (
    <Layout>
      <h2>Home</h2>
      <h3>{process.env.NEXT_PUBLIC_SKYWAY_API_KEY}</h3>
      <h3>{process.env.NEXT_PUBLIC_TEST}</h3>

      <button onClick={handleClick}>Button</button>
    </Layout>
  );
};

export default Home;
