import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import { useEffect } from "react";
import Layout from ".//Components/Layout";
import { NextUIProvider , createTheme} from "@nextui-org/react";

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      error: '#691c32',
    },
  }
})

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <NextUIProvider theme={theme}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
