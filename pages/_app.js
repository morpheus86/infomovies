import "../style.css";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import "@fortawesome/fontawesome-free/css/all.css";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
