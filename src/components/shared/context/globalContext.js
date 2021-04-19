import {createContext} from "react"
import {useAuth} from "../hooks/authHook"
import {useSocketCC} from "../hooks/socketCCHook"


export const GlobalContext = createContext()

export const GlobalProvider = (props) => {

  const [
    handleLogin, 
    handleLogout, 
    isLoggedIn, 
    handleSignUp, 
    userInfo, 
    spinner, 
    errorMessage,
    setErrorMessage, 
    handleVerify, 
    emailSent, 
    setEmailSent, 
    setEmailSentError, 
    emailSentError, 
    snackOpen,
    newUser,
    setSnackOpen,
     ] = useAuth();

  const [livePrices, startSocketConnection, closeSocketConnection] = useSocketCC()

    return (
      <GlobalContext.Provider value={{
        handleLogin,
        handleLogout, 
        isLoggedIn, 
        handleSignUp,
        userInfo, 
        spinner,
        errorMessage,
        setErrorMessage,
        handleVerify,
        emailSent, 
        setEmailSent,
        emailSentError,
        snackOpen,
        setSnackOpen,
        newUser,
        setEmailSentError,
        startSocketConnection,
        livePrices,
        closeSocketConnection,
      }}>
        {props.children}
      </GlobalContext.Provider>
    )
}