import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import { useEffect } from "react";
import Layout from ".//Components/Layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
