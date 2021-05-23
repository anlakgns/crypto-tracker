import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import { PortfolioModalFirst } from "./PortfolioModalFirst";
import { PortfolioModalSecond } from "./PortfolioModalSecond";

const useStyles = makeStyles((theme) => ({
  mainContainerPaper: {
    borderRadius: "2em",
    backgroundColor: theme.palette.primary.light,
  },
  dialogPaper: {
    overflowY: "visible",
  },
}));

export const PortfolioModal = (props) => {
  const classes = useStyles();
  const {
    openPortfolioModal,
    setPortfolioModal,
    page,
    setPage,
    selectedCoin,
    setSelectedCoin,
  } = props;

  // Dom Handlers
  const listItemHandler = (coin) => {
    setPage(2);
    setSelectedCoin(coin);
  };
  const handleClose = () => {
    setPortfolioModal(false);
  };
  const handleBack = () => {
    setPage(1);
  };

  return (
    <Dialog
      open={openPortfolioModal}
      onClose={handleClose}
      className={classes.mainContainer}
      classes={{ paper: classes.dialogPaper }}
      PaperProps={{ className: classes.mainContainerPaper }}
    >
      {page === 1 ? (
        <PortfolioModalFirst
          listItemHandler={listItemHandler}
          handleClose={handleClose}
        />
      ) : (
        <PortfolioModalSecond
          setPage={setPage}
          handleClose={handleClose}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          setPortfolioModal={setPortfolioModal}
          handleBack={handleBack}
        />
      )}
    </Dialog>
  );
};
