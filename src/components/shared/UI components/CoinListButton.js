import React, {useState, useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import MenuItem from "@material-ui/core/MenuItem"
import {makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core"

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
  select:{
    minHeight:"4em",
    color:"white",
    background: "linear-gradient(160deg, rgba(87,95,153,1) 20%, rgba(255,147,213,1) 100%)",
  },
  selectRoot:{
    outline:"none",
    border:"none"
  },
  selectFilledRoot:{
    paddingLeft: "20px",
    paddingTop:"20px",
    paddingRight:"10px",
    paddingBottom:"20px",

  },
  menuItemGuttersRoot:{
    paddingRight:"0px",
  },
  menuItemGridContainer: {
    width:"17em", 
  },
  menuItemLogo:{
    width:"1em",
    display:"flex",
    alignItems: "center",
  },
  coinCodeMenuItem: {
    opacity:0.7, 
    fontSize:"0.8em"
  },
}))


export const CoinListButton = ({coinList, onChange, selected, width})=> {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl} style={{width: width ||  "100%"}}>
                 <InputLabel classes={{root: classes.labelRoot}} className={classes.inputLabel} id="crypto">Crypto</InputLabel>
                <Select
                  labelId="crypto"
                  value={selected}
                  onChange={onChange}
                  classes={{outlined: classes.selectRoot, filled: classes.selectFilledRoot}}
                  className={classes.select}
                  variant="filled"
                  disableUnderline= {true}
                >
                   <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {coinList.map(coin => {
                    return (
                      <MenuItem value={coin} classes={{gutters: classes.menuItemGuttersRoot}}  key={coin.id} >
                        <Grid container direction="row" alignItems="center" justify="space-between" className={classes.menuItemGridContainer}>
                            <Grid item container alignItems="center"  md={9} >
                              <Grid item md={2}>
                                <img className={classes.menuItemLogo} src={coin.logo_url} alt={coin.id} />
                              </Grid>
                              <Grid item md={10} >
                                <Typography align="left">
                                  {coin.name}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item md={3}>
                            <Typography align="right" className={classes.coinCodeMenuItem} >
                              {coin.id}
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