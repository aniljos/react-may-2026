export type AuthState = {

    isAuthenticated: boolean;
    username: string;
    accessToken: string;
    refreshToken: string
}
export type AuthAction = {
    type: string;
    payload?: AuthState
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: "",
    accessToken: "", 
    refreshToken: ""
}

//actions
//login: {type: "login", payload: {isAuthenticated: true, username: "", accessToken:"", refreshToke: ""}}
//logout: {type: "logout"}

//reducer
export const authReducer = (state=initialState, action: AuthAction) => {

    if(action.type === "login" && action.payload){
        return action.payload;
    }
    if(action.type === "logout"){
        return initialState;
    }
    return state;
}