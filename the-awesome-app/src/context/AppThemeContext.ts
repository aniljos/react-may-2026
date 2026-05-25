import { createContext } from "react";

export type ThemeState = {
    mode: 'dark' | 'light'
}

export const initialState: ThemeState = {
    mode: "dark"
}

//context(store)
export const AppThemeContext = createContext(initialState);
