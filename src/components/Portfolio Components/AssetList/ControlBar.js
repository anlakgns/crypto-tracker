import React, {useState} from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { Typography, IconButton } from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {PortfolioModal} from "../../CoinsMarket Components/portfolioModal/PortfolioModal"
import {motion, AnimatePresence } from "framer-motion"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles(theme => ({
  headline:{
    fontSize:"0.8em"
  },
  headIconContainer: {
    paddingTop:"0.7em",
    paddingLeft:"1em",
    paddingRight:"1em",
    paddingBottom:"0.5em",
  },
  btnIcon:{
    color: theme.palette.common.white
  },
  btnIconRoot:{
    padding: "0.4em",
    fontSize:"0.5em"
  },
  icons: {
    fontSize:"2.4em"
  },
  tab:{
    fontSize:"0.7em", 
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
    height:"1.5em",
  },
  iconGridContainer:{
    display:"flex",
    justifyContent:"flex-end"
  },
  searchInput:{
    width:"0em",
    borderRadius:"2em",
    height:"1.4em",
    paddingLeft:"0.5em"
  }
  
}))

export const ControlBar = ({coinListResponse, setSubmitSearchTerm, setTabValue, tabValue, sort, setSort, setPortfolioModal, openPortfolioModal, setPage, page, selectedCoin, setSelectedCoin})=> {
  const classes = useStyles()
  const [inputOpen, setInputOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState()


  const tabHandler = (_, newValue) => {
    setTabValue(newValue)
  } 

  const InputOpener = () => {
    setInputOpen(prev => !prev)
  }

  const inputChangeHandler = (e) => {
    setSearchTerm((e.target.value).toLowerCase())
    console.log(e.target.value)
  }

  const inputSubmitHandler = (e)=> {
    e.preventDefault();
    setSubmitSearchTerm(searchTerm)
  }

  const SortHandler = ()=> {
    setSort(prev => !prev)
  }


  return (
    <>  
        {/* Headline & Icons */}
        <Grid item container direction="row" alignItems="center" justify="flex-end" className={classes.headIconContainer}>
          <Grid item md>
            <Typography className={classes.headline}>
              My Assets
            </Typography>
          </Grid>
          <Grid item md className={classes.iconGridContainer} >
            <IconButton className={classes.btnIcon} classes={{root: classes.btnIconRoot}} onClick={SortHandler}>
              { sort ? 
                <ArrowDownwardIcon className={classes.icons}/>
                :
                <ArrowUpwardIcon className={classes.icons}/>
              }
            </IconButton>
            <IconButton className={classes.btnIcon} classes={{root: classes.btnIconRoot}} onClick={InputOpener}>
              <SearchIcon className={classes.icons} />
            </IconButton >
            <AnimatePresence >
              {
              inputOpen && 
                <motion.form onSubmit={inputSubmitHandler}>
                  <motion.input 
                    onChange = {(e)=> inputChangeHandler(e)}
                    className={classes.searchInput}
                    animate={{width: "7em"}}
                    transition={{duration: 1}} 
                    exit={{width: "0em"}} 
                    />
                </motion.form>
              }
            </AnimatePresence> 
            <IconButton className={classes.btnIcon} classes={{root: classes.btnIconRoot}} onClick={()=> setPortfolioModal(true)}>
              <AddCircleOutlineOutlinedIcon className={classes.icons}  />
            </IconButton>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Grid item container justify="center" >
          <Tabs className={classes.tabs} classes={{root: classes.tabsRoot}} value={tabValue} onChange={tabHandler}>
            <Tab classes={{root: classes.tabRoot}} className={classes.tab} label="Price" />
            <Tab classes={{root: classes.tabRoot}} className={classes.tab} label="Value" />
            <Tab classes={{root: classes.tabRoot}} className={classes.tab} label="Profit" />
          </Tabs>
        </Grid>
        <PortfolioModal 
          openPortfolioModal={openPortfolioModal} 
          setPortfolioModal={setPortfolioModal} 
          coinListResponse={coinListResponse}
          page={page}
          setPage={setPage}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
        <div className={classes.bottomLine}/>    
    </>
  )
}
