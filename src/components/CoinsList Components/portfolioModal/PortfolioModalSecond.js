import 'date-fns';
import {useState, useEffect} from "react"
import {makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {CoinListButton} from "../../shared/UI components/CoinListButton"
import {ResultBox} from "../../shared/UI components/ResultBox"
import {QuantityInput} from "../../shared/UI components/QuantityInput"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import NotesIcon from '@material-ui/icons/Notes';
import ButtonSecondary from "../../shared/UI components/ButtonSecondary"

const useStyles = makeStyles(theme => ({
  mainContainer: {
  },
  gridContainer: {
    background: "linear-gradient(20deg, rgba(87,95,153,1) 50%, rgba(255,147,213,1) 100%)",
    height:"35em", 
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
  tabs:{
    color:"white",
    marginBottom:"1.5em",
  },
  tab: {
    width:"8em"
  },
  tabRoot: {
    minWidth: 0,
  },
  inputLabel:{
    color:"white"
  },
  iconsButton:{
    color:"white",
  },
  spentGridContainer:{
    color:"white",
    marginTop:"1em",
  }

}))



export const PortfolioModalSecond = ({setPage, handleClose, responseCoins})=> {
  const classes = useStyles()
  const [transactionType, setTransactionType] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("")
  const [coinQuantity, setCoinQuantity] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(()=> {
    const totalSpentCalc = ()=> {
      const allspent = selectedCoin.price * +coinQuantity;
      setTotalSpent(allspent)
    }
    totalSpentCalc()
  }, [selectedCoin,coinQuantity ])
  
  

  const handleTabChange = (e, newValue)=> {
    setTransactionType(newValue)
  }
  const handleChangeCrypto = (event) => {
    setSelectedCoin(event.target.value);
  };
  const coinQuantityHandler = (event) => {
    setCoinQuantity(event.target.value)
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // useEffect(() => {
  //   return () => {
  //     setPage(1)
  //   };
  // }, []);

  return (
    <Grid container className={classes.gridContainer} direction="column">
        
        { /* Headline & Cross */}
        <Grid item container justify="space-between" className={classes.headlineContainer} >
          <Grid item>
            <Typography variant="h5">Add Transaction</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose} classes={{root: classes.crossIconButton}}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        { /* Switcher -  Among Transaction Types */}
        <Grid item container justify="center" >
          <Tabs
            value={transactionType}
            onChange={handleTabChange}
            className={classes.tabs}
            TabIndicatorProps={{style: {display:"none"}}}>
            <Tab label="Buy" className={classes.tab} classes={{root: classes.tabRoot}} />
            <Tab label="Sell" className={classes.tab} classes={{root: classes.tabRoot}} />
            <Tab label="Transfer"className={classes.tab} classes={{root: classes.tabRoot}} />
          </Tabs>
        </Grid>

        { /* Select Coin List */}
        <Grid item container>
        <CoinListButton 
          coinList={responseCoins}
          onChange = {handleChangeCrypto}
          selected={selectedCoin} />
        </Grid>

        { /* Quantity and Price Input&Box */}
        <Grid item container justify="center" spacing={2}>
          <Grid item>
            <Typography className={classes.inputLabel}>Quantity</Typography>
            <QuantityInput 
              onChange = {coinQuantityHandler}
              value={coinQuantity}  />
          </Grid>
          <Grid item>
            <Typography className={classes.inputLabel}>Price Per Coin</Typography>
            <ResultBox value={selectedCoin?.price} />
          </Grid>
        </Grid>

        { /*  Fee & Notes Buttons */}
        <Grid item container justify="space-around" alignItems="center" xs={11} >
          
          
          { /* Fee */}
          <Grid item md={2}>
              <Button className={classes.iconsButton} >
                <MonetizationOnIcon />
                <Typography>Fee</Typography>
              </Button>
          </Grid>

          { /* Notes */}
          <Grid item md={2}>
            <Button className={classes.iconsButton} >
                <NotesIcon />
              <Typography>Notes</Typography>
            </Button>
          </Grid>

        </Grid>

        { /* Total Spend Info Box */}
        <Grid item container justify="center" className={classes.spentGridContainer}>
          <ResultBox value={totalSpent} />
        </Grid>

        { /* Add Transaction Button */}
        <Grid item container>
          <ButtonSecondary 
            contentText="Add Transaction"
            width="100%"
          />
        </Grid>



      
    </Grid>
  )
}


