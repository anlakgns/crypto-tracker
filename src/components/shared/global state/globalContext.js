import {createContext} from "react"
import {useAuth} from "./authHook"


export const GlobalContext = createContext()

export const GlobalProvider = (props) => {

  const [
    handleLogin,
    handleLogout,
    handleVerify,
    handleSignUp,
    state,
    dispatch,
    ACTIONS
  ] = useAuth();


    return (
      <GlobalContext.Provider value={{
        handleLogin,
        handleLogout,
        handleVerify,
        handleSignUp,
        state,
        dispatch,
        ACTIONS
      }}>
        {props.children}
      </GlobalContext.Provider>
    )
}