import type { NextPage } from "next";
import { Layout } from "src/components/layout/layout";

const Home: NextPage = () => {
  const handleClick = () => {
    window.alert("Hello, World!");
  };

  return (
    <Layout>
      <h2>Home</h2>
      <button onClick={handleClick}>Button</button>
    </Layout>
  );
};

export default Home;
