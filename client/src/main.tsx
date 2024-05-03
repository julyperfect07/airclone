import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store, persistore } from "../redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistore}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
