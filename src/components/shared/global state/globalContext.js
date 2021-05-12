import {createContext} from "react"
import {useAuth} from "./authHook"
import {usePortfolio} from "./portfolioHook"
import {useFetchData} from "../apis & socket/fetchDataHook"

export const GlobalContext = createContext()

export const GlobalProvider = (props) => {
  const { 
    setSourceAPI, 
    sourceAPI  
  } = useFetchData()

  const [
    handleLogin,
    handleLogout,
    handleVerify,
    handleSignUp,
    state,
    dispatch,
    ACTIONS
  ] = useAuth();

  const {
    portfolioBuyOrderList, 
    setPortfolioBuyOrderList, 
    totalSpent, 
    totalSpentByCoin, 
    setCoinToDelete, 
    portfolioList,
    coinListResponse,
    totalProfit,
    selectedCoinForGraph,
    setSelectedCoinForGraph
     } = usePortfolio()



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
        setSourceAPI,
        portfolioList,
        coinListResponse,
        totalProfit,
        selectedCoinForGraph,
        setSelectedCoinForGraph
      }}>
        {props.children}
      </GlobalContext.Provider>
    )
}