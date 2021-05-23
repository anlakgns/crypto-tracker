import { createContext } from "react";
import { usePortfolio } from "../hooks/portfolioHook";

export const PortfolioContext = createContext();

export const PortfolioProvider = (props) => {

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
    setSelectedCoinForGraph,
  } = usePortfolio();

  return (
    <PortfolioContext.Provider
      value={{
        portfolioBuyOrderList,
        setPortfolioBuyOrderList,
        totalSpent,
        totalSpentByCoin,
        setCoinToDelete,
        portfolioList,
        coinListResponse,
        totalProfit,
        selectedCoinForGraph,
        setSelectedCoinForGraph,
      }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};
