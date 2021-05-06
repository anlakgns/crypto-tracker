import React, {useEffect} from "react"
import {makeStyles} from '@material-ui/styles'
import {CoinItem} from "./CoinItem"
import {useFetchData} from "../../shared/apis & socket/fetchDataHook"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    paddingBottom: 0,
  },
  list: {
    overflow: 'auto',
    maxHeight:"38vh"

  },
  
}))

export const CoinList = ()=> {
  const classes = useStyles()
  
  
  // Değişcek bunlar global state den portfolio coinleri gelecek
  const [responseCoins, fetchData ] = useFetchData();
  const topEightCoin = responseCoins.slice(0, 5)

  useEffect( ()=> {
    fetchData();
  }, [fetchData])

  return (
    <>
    <List   
      disablePadding 
      classes={{root: classes.listRoot}}
      className={classes.list}
    > 
      {topEightCoin.map(coin => {
        return (
          <ListItem 
            button 
            disableGutters 
            classes={{root: classes.listItemRoot}}
            key={coin.id}
            >
            <CoinItem 
              name={coin.name} 
              id={coin.id} 
              price={coin.price}
              logo={coin.logo_url}
              quantity={341}
              change={coin["1d"].price_change_pct}
            />
          </ListItem>
        )
      })}
    </List>

    </>
  )
}
