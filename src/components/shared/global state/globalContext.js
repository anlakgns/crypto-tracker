import {createContext} from "react"
import {useAuth} from "./authHook"
import {usePortfolio} from "./portfolioHook"

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

  const {portfolioBuyOrderList, setPortfolioBuyOrderList, totalSpent, totalSpentByCoin, setCoinToDelete, sourceAPI, setSourceAPI } = usePortfolio()

    return (
      <GlobalContext.Provider value={{
        handleLogin,
        handleLogout,
        handleVerify,
        handleSignUp,
        state,
        dispatch,
        ACTIONS,
        portfolioBuyOrderList,
        setPortfolioBuyOrderList,
        totalSpent,
        totalSpentByCoin,
        setCoinToDelete,
        sourceAPI, 
        setSourceAPI
      }}>
        {props.children}
      </GlobalContext.Provider>
    )
}