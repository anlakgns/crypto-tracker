import React, {useContext, useState, useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import {makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from "@material-ui/core"
import {GlobalContext} from '../global state/globalContext'

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
    marginLeft:"1em",

  },
  select:{
    color:"white",
    background: theme.palette.common.textPurple,
    borderRadius:"30px"

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


export const CoinListButton = ({onChange, selected, width, height})=> {
  const {coinListResponse} = useContext(GlobalContext)
  const [selectedUpdate, setSelectedUpdate] = useState("")
  const classes = useStyles();

  useEffect(()=> {
    const selectedFind = coinListResponse.find(c => c.name === selected.name)
    setSelectedUpdate(selectedFind)

  }, [coinListResponse,selected ])

  return (
    <FormControl variant="outlined" className={classes.formControl} style={{width: width ||  "100%"}}>
                 {/* <InputLabel classes={{root: classes.labelRoot}} className={classes.inputLabel} id="crypto">Crypto</InputLabel> */}
                <Select
                  labelId="crypto"
                  value={selectedUpdate}
                  onChange={onChange}
                  classes={{outlined: classes.selectRoot, filled: classes.selectFilledRoot}}
                  className={classes.select}
                  variant="filled"
                  disableUnderline= {true}
                  style={{height: height || "3em"}}
                >
                   <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {coinListResponse.map(coin => {
                    return (
                      <MenuItem value={coin} classes={{gutters: classes.menuItemGuttersRoot}}  key={coin.id} >
                        <Grid container direction="row" alignItems="center" justify="space-between" className={classes.menuItemGridContainer}>
                            <Grid item container alignItems="center"  md={9} >
                              <Grid item md={2}>
                                <img className={classes.menuItemLogo} src={coin.logo} alt={coin.id} />
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