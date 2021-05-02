import {useState, useEffect} from "react"
import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import CloseIcon from '@material-ui/icons/Close';
import {SearchBar} from "../../shared/UI components/SearchBar"
import {makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  mainContainer: {
  },
  gridContainer: {
    background: "linear-gradient(20deg, rgba(87,95,153,1) 50%, rgba(255,147,213,1) 100%)",
    height:"40em", 
    width:"27em",
    borderRadius:"2em",
    border: "4px solid",
    borderColor: theme.palette.primary.main,
  },
  mainContainerPaper: {
    borderRadius:"2em",
    backgroundColor: theme.palette.primary.light,
  },
  headlineContainer:{
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"2em",
    marginBottom:"1em" ,
    color:"white"
  },
  crossIconButton:{
    padding:"0px",
    color:"white",
  },
  searchBarContainer: {
    height:"2em",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    color:"white",
  },
  listContainer: {
    paddingLeft:"0.3em",
    paddingRight:"0.3em",
    width:"100%",
    color:"white"
  },
  iconContainer:{
    minWidth: "0px",
    color:"white"
  },
  logo: {
    width: "1.2em",
    marginRight:"1em"
  }
}))



export const PortfolioModalFirst = ({responseCoins, listItemHandler, handleClose}) => {
  const classes = useStyles()
  const [searchChangeTerm, setSearchChangeTerm] = useState();
  const [searchSubmitTerm, setSearchSubmitTerm] = useState();
  const [renderList, setRenderList] = useState([]);

  // Helper Functions
  const sortTopTen = (data) => {
    const sortedList = data.sort((a,b)=> b.market_cap - a.market_cap).slice(0,10);
    return sortedList
  }

  useEffect(()=> {
    const topten = sortTopTen(responseCoins)
    const searchResult = responseCoins.filter(coin => coin.name.toLowerCase().trim().includes(searchSubmitTerm)) 
    setRenderList(searchResult.length === 0 || searchResult.length === responseCoins.length ? topten : searchResult )
    console.log(searchResult.length)

  }, [responseCoins,searchSubmitTerm ])
  
  
  // DOM Handlers
  const searchBoxChangeHandler = (e) => {
    setSearchChangeTerm(e.target.value)
  }
  const searchBoxSubmitHandler = (e)=> {
    e.preventDefault();
    const lowerChanger = searchChangeTerm.toLowerCase();
    setSearchSubmitTerm(lowerChanger)
  }

  return (
      <Grid container className={classes.gridContainer} direction="column">

        { /* Headline & Cross */}
        <Grid item container justify="space-between" className={classes.headlineContainer} >
          <Grid item>
            <Typography variant="h5">Select Coin</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose} classes={{root: classes.crossIconButton}}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        { /* Search Bar */}
        <Grid item container className={classes.searchBarContainer}>
          <SearchBar onChange={searchBoxChangeHandler} onSubmit={searchBoxSubmitHandler} />
        </Grid>

        { /* Coin List */}
        <Grid item container>
          <List component="nav" className={classes.listContainer} >
            {renderList.map(coin => {
              return (
                <ListItem button key={coin.id} onClick={listItemHandler}>
                  <img src={coin.logo_url} className={classes.logo} />
                  <ListItemText primary={coin.name} />
                  <ListItemIcon classes={{root: classes.iconContainer}} >
                      < ArrowForwardIosIcon style={{fontSize:"small"}}   />
                  </ListItemIcon>
                </ListItem>
              )
            })}
          </List>
        </Grid>
      </Grid>
  )
}