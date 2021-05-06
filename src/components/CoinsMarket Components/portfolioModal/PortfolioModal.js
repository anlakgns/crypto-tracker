import {useState} from "react"
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

export const PortfolioModal = ({openPortfolioModal, setPortfolioModal, responseCoins}) => {
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState("")
  

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
          responseCoins={responseCoins} 
          listItemHandler={listItemHandler}
          handleClose={handleClose}  />
      : 
        <PortfolioModalSecond 
          setPage={setPage} 
          handleClose={handleClose} 
          responseCoins={responseCoins}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      }
    </Dialog>
  )

}