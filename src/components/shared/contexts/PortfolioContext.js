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
    bookmarkHandler,
    bookmarks
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
        bookmarkHandler,
        bookmarks
      }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};
