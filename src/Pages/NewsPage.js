import React, {useEffect} from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import HeaderM from "../components/Landing Components/Introduction Section/HeaderM"
import NewRecentList from "../components/News Components/NewRecentList"
import NewCoinList from "../components/News Components/NewCoinList"
import NewHero from "../components/News Components/NewHeroList"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NewCard from "../components/News Components/NewCard"
import waves from "../assets/graph-dark.svg"
import axios from "axios"; 

const useStyles = makeStyles(theme => ({
 headpage: {
   backgroundColor: theme.palette.common.darkPurple,
 },
 new: {
    backgroundColor: theme.palette.common.darkPurple
 },
 waves: { 
  width:"100%", 
  position:"relative", 
  marginBottom:"-9em"
}
}))

const NewsPage = ()=> {
  const theme = useTheme()
  const matchXS = useMediaQuery(theme.breakpoints.down('xs'))
  console.log(matchXS)
  const classes = useStyles()

  useEffect(async ()=> {
    const response = await axios.get("/posts/?auth_token=7e7e477aa2c90c444c56da9455a325e492490f41", {
      

    })
      console.log(response.data)
     
 }, [])



  return (
    <>
    <Grid container direction="column" className={classes.headpage} wrap="nowrap" >
      
      {/* Header Section */}
      <Grid item >
        <Grid container direction="column" >
          <HeaderM />
        </Grid>
      </Grid>

      {/* News Main Section  */}
      <Grid item >
          <Grid 
            container 
            direction={`${matchXS ? "column" : "row"}`} 
            justify="center" 
            wrap="nowrap"
            >
              <Grid item xs={12}  sm={8} style={{marginRight: `${matchXS ? "0em" : "2em"}`}} >
                <NewHero />
              </Grid>
              <Grid item xs={12} sm={3} >
                <NewRecentList />
              </Grid>
          </Grid>
          <Grid 
            container 
            direction={`${matchXS ? "column" : "row"}`} 
            justify="center" 
            wrap="nowrap"
            
            >
              <Grid item container  xs={12}  sm={8} style={{marginRight: `${matchXS ? "0em" : "2em"}`}}  >
                <Grid item sm style={{marginRight: `${matchXS ? "0em" : "2em"}`}} >
                  <NewCard  />
                </Grid>
                <Grid item sm >
                  <NewCard />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}  >
                <NewCoinList />
              </Grid>
          
          </Grid>
          <Grid 
            container 
            direction={`${matchXS ? "column" : "row"}`} 
            justify="center" 
            wrap="nowrap"
            
            >
              <Grid item container  xs={12}  sm={8} style={{marginRight: `${matchXS ? "0em" : "2em"}`}}  >
                <Grid item sm style={{marginRight: `${matchXS ? "0em" : "2em"}`}} >
                  <NewCard  />
                </Grid>
                <Grid item sm >
                  <NewCard />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}  >
                <NewCoinList />
              </Grid>
          
          </Grid>
          <Grid 
            container 
            direction={`${matchXS ? "column" : "row"}`} 
            justify="center" 
            wrap="nowrap"
            
            >
                <Grid item xs={12} style={{padding: "0em 2em", marginBottom:"2em" }} >
                  <NewCard  />
                </Grid>

          </Grid>
          <Grid item >
          <img src={waves} className={classes.waves} alt="background pattern" />
        </Grid>
  
      </Grid>

    </Grid>
    </>
  )
}

export default NewsPage

