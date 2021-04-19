import React from "react"
import Grid from "@material-ui/core/Grid"
import LogoButton from "../../shared/UI components/LogoButton"
import TabsCom from "../../HeaderComponents/TabsCom"
import DrawerCom from "../../HeaderComponents/DrawerCom"
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';


const HeaderM = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md')); // Responsive Listener

  return (
    <Grid item container direction="row" justify="space-between" style={{marginLeft: "auto", padding:"2em"}}>
      <Grid item>
        <LogoButton />
      </Grid>
      <Grid item>
        {matches ? <TabsCom /> : <DrawerCom/>}
      </Grid>
    </Grid>
  )
} 

export default HeaderM