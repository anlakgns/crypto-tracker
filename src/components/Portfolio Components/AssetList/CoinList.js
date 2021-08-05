import React, {useContext, useEffect, useState} from "react"
import {makeStyles} from '@material-ui/styles'
import {CoinItem} from "./CoinItem"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {PortfolioContext} from "../../shared/contexts/PortfolioContext"

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    paddingBottom: 0,
  },
  list: {
    overflow: 'auto',
    maxHeight:"38vh",
    margin: "auto"
  },
  listRoot: {
    width:"100%"
  }
  
}))

export const CoinList = (props)=> {
  const {
    submitSearchTerm, 
    tabValue, 
    sort, 
    setPortfolioModal, 
    setPage, 
    setSelectedCoin, 
    coinListResponse} = props
    
    const classes = useStyles()
    const {totalSpentByCoin, portfolioList, setSelectedCoinForGraph} = useContext(PortfolioContext)
    const [renderList, setRenderList] = useState(totalSpentByCoin)
    
  useEffect(()=> {
    const searchedList = totalSpentByCoin?.filter((coin) =>
    coin.name.toLowerCase().includes(submitSearchTerm))

    if(searchedList.length > 0) {
      setRenderList(searchedList)
    }

    if(searchedList.length === 0) {
      setRenderList(totalSpentByCoin)
    }

  }, [submitSearchTerm, totalSpentByCoin, tabValue])

  // Tab Switch 
  useEffect(()=> {
    let sortedList
    switch(tabValue) {
      case 0: 
        sortedList = (!sort ? renderList.sort((a,b) => b.allInfo.price - a.allInfo.price) : renderList.sort((a,b) => a.allInfo.price - b.allInfo.price))
        break;
      case 1: 
        sortedList = (!sort ? renderList.sort((a,b) => b.value - a.value) : renderList.sort((a,b) => a.value - b.value))
        break;
      case 2: 
        sortedList = (!sort ? portfolioList.sort((a,b) => b.profit - a.profit) : portfolioList.sort((a,b) => a.profit - b.value))
        break;
      default:
        sortedList = renderList
    }
    setRenderList(sortedList)

  }, [sort, renderList, tabValue, portfolioList])
  
  return (
    <>
    <List   
      disablePadding 
      classes={{root: classes.listRoot}}
      className={classes.list}
    > 
      {renderList.map(coin => {
        return (
          <ListItem 
            button 
            onClick={()=> {setSelectedCoinForGraph(coin.allInfo.id)}}
            disableGutters 
            classes={{root: classes.listItemRoot}}
            key={coin.name}
            >
            <CoinItem 
              tabValue={tabValue}
              setPortfolioModal={setPortfolioModal}
              setPage={setPage}
              setSelectedCoin={setSelectedCoin}
              coin={coin}
              coinListResponse={coinListResponse}
            />
          </ListItem>
        )
      })}
    </List>


    </>
  )
}
