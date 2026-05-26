import { createContext, useState, type JSX } from "react";

export type ThemeState = {
    mode: 'dark' | 'light',
    changeMode?: (mode: 'dark' | 'light') => void
}

export const initialState: ThemeState = {
    mode: "dark"
}

//context(store)
export const AppThemeContext = createContext(initialState);

type AppThemeProviderProps = {
    children: JSX.Element
}

export function AppThemeProvider(props: AppThemeProviderProps){

    const [mode, setMode] = useState(initialState.mode);

    return (
        <AppThemeContext.Provider value={{mode, changeMode: setMode}}>
            {props.children}
        </AppThemeContext.Provider>
    )
}
