import {createContext} from "react"
import {useAuth} from "./authHook"


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
      }}>
        {props.children}
      </GlobalContext.Provider>
    )
}