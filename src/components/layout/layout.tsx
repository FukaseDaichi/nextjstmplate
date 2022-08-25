import type { ReactNode } from "react";
import { Footer } from "src/components/footer/footer";
import { Header } from "src/components/header/header";

export const Layout: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
