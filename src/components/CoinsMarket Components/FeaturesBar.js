import React, {useState} from "react"

import Grid from "@material-ui/core/Grid"
import {makeStyles } from '@material-ui/core/styles';
import Checkbox from "@material-ui/core/Checkbox"
import IsoIcon from '@material-ui/icons/Iso';
import Popover from '@material-ui/core/Popover';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import {SearchBar} from "../shared/UI components/SearchBar"
import {PortfolioModal} from "./portfolioModal/PortfolioModal"
import {CalculatorCard} from "./CalculatorCard"

const useStyles = makeStyles(theme => ({
  favoritesCheckbox:{
    margin: "auto"
  },
  labelCheckboxSwitch:{
    fontSize: "0.9em",
    fontWeight:"400"
  },
  popoverPaper: {
    borderRadius:"2em",
  },
  btnCalc: {
    color: "white",
    textTransform: "none",
    fontSize:"0.9em",
    fontWeight:"400"
  },
}))

export const FeatureBar = (props)=> {
  const classes = useStyles() 
  const {coinListResponse, setSearchSubmitTerm, setLivePriceSwitch, livePriceSwitch, setFavoriteCheck, favoriteCheck} = props
  
  const [calcAnchor, setCalcAnchor] = useState(null);
  const [calculatorModalSwitch, setCalculatorModalSwitch] = useState(false)
  const [openPortfolioModal, setPortfolioModal] = useState(false);
  const [searchChangeTerm, setSearchChangeTerm] = useState();
  const [page, setPage] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState("")

  // Dom Handlers
  const searchBoxChangeHandler = (e) => {
    setSearchChangeTerm(e.target.value)
  }
  const searchBoxSubmitHandler = (e)=> {
    e.preventDefault();
    const lowerChanger = searchChangeTerm.toLowerCase();
    setSearchSubmitTerm(lowerChanger)
  }
  const switchHandler = ()=> {
    setLivePriceSwitch(!livePriceSwitch)
  }
  const calcHandlerClose = () => {
    setCalcAnchor(null);
    setCalculatorModalSwitch(false)

  };
  const calcHandlerOpen = (e) => {
    setCalcAnchor(e.currentTarget)
    setCalculatorModalSwitch(true)
  }
  const createPortfolioHandler = () => {
    setPortfolioModal(true)
  }


  return (
    <>
      {/* Search Box */}
      <Grid item md={4} container justify="flex-end"  >
        <SearchBar onChange={searchBoxChangeHandler} onSubmit={searchBoxSubmitHandler} />
      </Grid>
      
      {/* Favorite Checkbox */}
      <Grid item container justify="center" md={2}>
        <FormControlLabel
          control={<Checkbox checked={favoriteCheck} onChange={()=> setFavoriteCheck(!favoriteCheck)} name="jason" color="primary" />}
          label="Favorites"
          className={classes.favoritesCheckbox}
          classes={{label: classes.labelCheckboxSwitch}}
        />
      </Grid>
      
      {/* Live Price Switch */}
      <Grid item container justify="center" md={2} >
        <FormControlLabel 
            control={<Switch checked={livePriceSwitch} onChange={switchHandler} color="primary" />}
            label="Live Prices"
            classes={{label: classes.labelCheckboxSwitch}}
         />
      </Grid>
      
      {/* Calculator Button */}
      <Grid item container justify="center" md={2}>   
        <Button className={classes.btnCalc} onClick={calcHandlerOpen}>
          <IsoIcon color="primary" style={{marginRight:"0.3em"}} />
            Calculator
        </Button>
        <Popover
          classes={{paper: classes.popoverPaper}}
          open={calculatorModalSwitch}
          anchorEl={calcAnchor}
          onClose={calcHandlerClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
         >
           <CalculatorCard coinListResponse = {coinListResponse}  />
        </Popover>

      </Grid>
      
      {/* Create Portfolio Button */}
      <Grid item container justify="center" md={2}>
        <Button 
          variant="contained" 
          className={classes.btnCalc} 
          color="primary" 
          onClick={createPortfolioHandler}>Create a Portfolio
        </Button>
        <PortfolioModal 
          openPortfolioModal={openPortfolioModal} 
          setPortfolioModal={setPortfolioModal} 
          page={page}
          setPage={setPage}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}   
          />
      </Grid>
    </>
  )
}