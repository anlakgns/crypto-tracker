import React from "react"
import {makeStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  underline: {
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: "2px",
    marginRight:"auto",
    marginLeft:"auto",
    maxWidth:"100%"
  },
  headtext: {
    color:"white",
    fontSize: "1.8em",
    textAlign:"center"
  },
 }))


const HeadUnderline = (props)=> {
  const classes = useStyles()

  return (
    <>
      <Typography 
        variant="subtitle1" 
        className={classes.headtext} 
        style={{fontSize: `${props.fontSize || "1.8em" }`, marginTop: `${props.marginTop || "0em" }`  }}> 
        {props.headline}
      </Typography>
      <div className={classes.underline} style={{width: `${props.long || "0em"}`, marginBottom: `${props.marginBottom || "1em" }` }} />
    </>
  )
}

export default HeadUnderline