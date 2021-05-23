import React, {useState} from "react"
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonPrimary from './ButtonPrimary';
import Typography from '@material-ui/core/Typography';
import {useTheme} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidht:640,
    padding:"2em",
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
  },
  

  context: {
    color: theme.palette.common.textPurple,
  },
  btnContainer: {
    justifyContent: "center",
  }

}))



const ModalCard = ({headline, context, btnContext, open, onClose, onBtnClick})=> {
  const classes = useStyles();
  const theme = useTheme();

  const [modalCardOpen, setModalCardOpen] = useState(false)

  const handleClose = () => {
    setModalCardOpen(false);
  };

  return (
    <Dialog
        open={open || modalCardOpen}
        onClose={onClose || handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
        PaperProps={{style: {borderRadius: "2em"} }}>
      
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.headline}>
              {headline}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="center" className={classes.context}>
              {context}
            </Typography>
          </CardContent>
          <CardActions className={classes.btnContainer}>
          <ButtonPrimary 
              contentText={btnContext}
              color= {theme.palette.secondary.main}
              width="15em"
              onClick={ onBtnClick || onClose || handleClose}
              />
          </CardActions>
      </Card>

    </Dialog>
  )
}

export default ModalCard