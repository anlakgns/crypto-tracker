import React, {useState} from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import {CoinList} from "./CoinList"
import {ControlBar} from "./ControlBar"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    borderRadius:"0.6em",
    color: theme.palette.common.white,
    "@media (max-width:1024px)" : {
      marginTop: "1em",
      marginRight:"0.5em"
    },
  },
  controlBar:{
    borderTopRightRadius:"0.6em",
    borderTopLeftRadius:"0.6em",
    backgroundColor: theme.palette.common.blue2,
    minHeight:"6vh",
  },
  headline:{
    fontSize:"0.9em"
  },
  headIconContainer: {
    padding:"1em",
  },
  controlIcon:{
    marginLeft:"0.6em",
    fontSize:"1.2em"
  },
  tab:{
    fontSize:"0.75em", 
  },
  tabs:{
  },
  tabRoot: {
    minWidth: "100px",
    padding:"0",
    textTransform:"none",
    minHeight:"0"
  },
  tabsRoot:{
    padding:"0",
    minHeight:"0",
    height:"2em",
  },
  iconGridContainer:{
    display:"flex",
    justifyContent:"flex-end"
  },
  
}))

export const AssetListContainer = ()=> {
  const classes = useStyles()
  const [submitSearchTerm, setSubmitSearchTerm] = useState()
  const [tabValue, setTabValue] = useState(0);
  const [sort, setSort] = useState(false)
  const [openPortfolioModal, setPortfolioModal] = useState(false);
  const [page, setPage] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState('')

 
  return (
    <>
    <Grid 
      container 
      direction="column"
      className={classes.mainGrid} 
      >
      
      {/* Control Bar */}
      <Grid item container direction="column" className={classes.controlBar}>   
        <ControlBar 
          setSubmitSearchTerm={setSubmitSearchTerm} 
          tabValue={tabValue}
          setTabValue={setTabValue}
          setSort={setSort}
          sort={sort}
          openPortfolioModal={openPortfolioModal}
          setPortfolioModal={setPortfolioModal}
          page={page}
          setPage={setPage}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}

           /> 
      </Grid>

      {/* Asset List */}
      <Grid item container>
        <CoinList 
          submitSearchTerm={submitSearchTerm}
          tabValue={tabValue}
          sort={sort}
          setPortfolioModal={setPortfolioModal}
          setPage={setPage}
          setSelectedCoin={setSelectedCoin} />
      </Grid>

      
  
    </Grid>

    </>
  )
}
