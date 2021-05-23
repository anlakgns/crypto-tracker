import React from "react"

import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import {makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from "@material-ui/core"
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "12em",
    color:"white",
    marginBottom:"1em",
  },
  inputLabel:{
    color:"white",
    marginTop:"0.3em"
  },
  labelRoot: {
    color:"white",
    opacity:"0.8",
  },
  menuItemGuttersRoot:{
    paddingRight:"0px",
  },
  menuItemGridContainer: {
    width:"17em", 
  },
  coinCodeMenuItem: {
    opacity:0.7, 
    fontSize:"0.8em"
  },
}))


export const CurrencyListButton = (props)=> {
  const classes = useStyles();
  const {currencyList, onChange, selectedCurrency, width, height} = props

   // Custamizable Input Styles
   const BootstrapInput = withStyles((theme) => ({
    input: {
      borderRadius: 20,
      position: 'relative',
      backgroundColor: theme.palette.common.textPurple,
      color:theme.palette.common.white,
      border: '1px solid',
      borderColor: theme.palette.common.textPurple,
      fontSize: 16,
      height: height || "1.5em",
      padding: '0.7em',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 20,
        borderColor: theme.palette.secondary.main,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  return (
    <FormControl 
      className={classes.formControl} 
      style={{width: width ||  "100%"}}>
       
       <Select
         value={selectedCurrency}
         onChange={onChange}
         input={<BootstrapInput className={classes.selectInput} />}  
       >

       {/* Default Selection */}
       <MenuItem value="">
         <em>None</em>

       {/* Select List */}
       </MenuItem>
       {currencyList.map(currency => {
         return (
           <MenuItem 
             value={currency} 
             classes={{gutters: classes.menuItemGuttersRoot}} 
             className={classes.currencyListItem} 
             key={currency.currencyName} >
               <Grid 
                 container 
                 direction="row" 
                 alignItems="center" 
                 justify="space-between" 
                 className={classes.menuItemGridContainer}>
                 
                 {/* Currency Name */}
                 <Grid 
                   item 
                   md={9} 
                   style={{overflow: "hidden", fontSize:"0.9em"}} >
                   <Typography align="left">
                   {currency.currencyName}                              
                   </Typography>
                 </Grid>

                 {/* Currency Code */}
                 <Grid item md={3}>
                   <Typography align="right" className={classes.coinCodeMenuItem} >
                     {currency.currencyCode}
                   </Typography>
                 </Grid>

               </Grid>
            </MenuItem>
         )
       })}
    </Select>
  </FormControl>
  )
}