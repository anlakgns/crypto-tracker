import {PortfolioModalFirst} from "./PortfolioModalFirst"
import {PortfolioModalSecond} from "./PortfolioModalSecond"
import {makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles(theme => ({
  mainContainer: {
  },
  mainContainerPaper: {
    borderRadius:"2em",
    backgroundColor: theme.palette.primary.light,
  },
  dialogPaper:{
    overflowY: "visible",
    
  }
}))

export const PortfolioModal = (props) => {
  const {
    openPortfolioModal, 
    setPortfolioModal, 
    page, 
    setPage, 
    selectedCoin, 
    setSelectedCoin} = props 

  const classes = useStyles()
  
  

  const listItemHandler = (coin) => {
    setPage(2)
    setSelectedCoin(coin)
  }

  
  const handleClose = () => {
    setPortfolioModal(false)
  };

  
  return(
    <Dialog 
      open={openPortfolioModal} 
      onClose={handleClose} 
      className={classes.mainContainer} 
      classes={{paper: classes.dialogPaper}}
      PaperProps={{className: classes.mainContainerPaper}} >


      {page === 1 ? 
          <PortfolioModalFirst 
          listItemHandler={listItemHandler}
          handleClose={handleClose}  />
      : 
        <PortfolioModalSecond 
          setPage={setPage} 
          handleClose={handleClose} 
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          setPortfolioModal = {setPortfolioModal}
        />
      }
    </Dialog>
  )

}