import React from "react"
import {makeStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom"


const useStyles = makeStyles(theme => ({
  logo: {
    fontSize: "2rem",
    fontFamily: "roboto",
    textTransform: "none",
    textDecoration: "none",
  },
  logo2: {
    color: "white",
    fontWeight: "400",
    
  },
  
}))

const LogoButton = ()=> {
  const classes = useStyles(); 
  
  return (
      <Button>
        <Typography color="secondary" className={classes.logo} component={Link} to="/">
          <span className={classes.logo2}>Coin</span>ONE
        </Typography>
      </Button>
  )
}

export default LogoButton