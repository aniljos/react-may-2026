import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { AppThemeContext } from "./context/AppThemeContext.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeContext.Provider value={{mode: "dark"}}>
        <App />
      </AppThemeContext.Provider>
    </Provider>
  </StrictMode>,
);
