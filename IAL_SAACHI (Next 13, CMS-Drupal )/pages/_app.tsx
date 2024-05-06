import { AppProps } from "next/app";
import "styles/globals.css";
import { Navbar } from "components/Navbar";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header  />
      <Navbar  />
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
}
