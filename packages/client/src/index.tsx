import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Provider } from "react-redux";

import App from "./App";
import "@shopify/polaris/build/esm/styles.css";
import { createStore } from "./store/createStore";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider i18n={enTranslations}>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
