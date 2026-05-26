import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { AppThemeProvider } from "./context/AppThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <AppThemeContext.Provider value={{mode: "dark"}}> */}
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      {/* </AppThemeContext.Provider> */}
    </Provider>
   </StrictMode>,
);
