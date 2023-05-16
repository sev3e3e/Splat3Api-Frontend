import type { AppProps } from "next/app";
import "../styles/pages/_app.css";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default App;
