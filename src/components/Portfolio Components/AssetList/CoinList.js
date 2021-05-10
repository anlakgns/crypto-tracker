import React, {useContext, useEffect, useState} from "react"
import {makeStyles} from '@material-ui/styles'
import {CoinItem} from "./CoinItem"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {GlobalContext} from "../../shared/global state/globalContext"

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    paddingBottom: 0,
  },
  list: {
    overflow: 'auto',
    maxHeight:"38vh"

  },
  
}))

export const CoinList = ({submitSearchTerm, tabValue, sort, setPortfolioModal, setPage, setSelectedCoin, coinListResponse})=> {
  const classes = useStyles()
  const {totalSpentByCoin} = useContext(GlobalContext)
  const [renderList, setRenderList] = useState(totalSpentByCoin)
  console.log(totalSpentByCoin)
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
        sortedList = (sort ? renderList.sort((a,b) => b.allInfo.price - a.allInfo.price) : renderList.sort((a,b) => a.allInfo.price - b.allInfo.price))
        break;
      case 1: 
        sortedList = (sort ? renderList.sort((a,b) => b.value - a.value) : renderList.sort((a,b) => a.value - b.value))
        break;
      case 2: 
        sortedList = renderList
        break;
      default:
        sortedList = renderList
    }
    setRenderList(sortedList)

  }, [sort, renderList, tabValue])
  
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
            disableGutters 
            classes={{root: classes.listItemRoot}}
            key={Math.random()}
            >
            <CoinItem 
              name={coin.name} 
              id={coin.allInfo.id} 
              priceBought={coin.priceBought}
              logo={coin.allInfo.logo}
              quantity={coin.quantity}
              change={coin.allInfo.priceChangeDayPerc}
              value={coin.value}
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
