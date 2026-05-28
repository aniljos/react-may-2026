import { createContext, useContext, useMemo, useReducer, type Dispatch, type JSX } from "react";

export type BreadcrumbItem = {
    label: string;
    path: string;
};

type BreadcrumbsState = {
    items: BreadcrumbItem[];
};

type SetBreadcrumbsAction = {
    type: "set";
    payload: BreadcrumbItem[];
};

type ClearBreadcrumbsAction = {
    type: "clear";
};

type BreadcrumbsAction = SetBreadcrumbsAction | ClearBreadcrumbsAction;

type BreadcrumbsContextValue = {
    items: BreadcrumbItem[];
    dispatch: Dispatch<BreadcrumbsAction>;
    setBreadcrumbs: (items: BreadcrumbItem[]) => void;
    clearBreadcrumbs: () => void;
};

const initialState: BreadcrumbsState = {
    items: [],
};

function breadcrumbsReducer(state: BreadcrumbsState, action: BreadcrumbsAction): BreadcrumbsState {
    switch (action.type) {
        case "set":
            return {
                ...state,
                items: action.payload,
            };
        case "clear":
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
}

const BreadcrumbsContext = createContext<BreadcrumbsContextValue | null>(null);

type BreadcrumbsProviderProps = {
    children: JSX.Element;
};

export function BreadcrumbsProvider(props: BreadcrumbsProviderProps) {
    const [state, dispatch] = useReducer(breadcrumbsReducer, initialState);

    const value = useMemo<BreadcrumbsContextValue>(() => {
        return {
            items: state.items,
            dispatch,
            setBreadcrumbs(items) {
                dispatch({ type: "set", payload: items });
            },
            clearBreadcrumbs() {
                dispatch({ type: "clear" });
            },
        };
    }, [state.items]);

    return (
        <BreadcrumbsContext.Provider value={value}>
            {props.children}
        </BreadcrumbsContext.Provider>
    );
}

export function useBreadcrumbs() {
    const context = useContext(BreadcrumbsContext);

    if (!context) {
        throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
    }

    return context;
}

export { breadcrumbsReducer, initialState as breadcrumbsInitialState };
