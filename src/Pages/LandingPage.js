import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../components/HeaderComponents/Header';
import Headline from '../components/Landing Components/Introduction Section/Headline';
import Waves from '../components/Landing Components/Introduction Section/Waves';
import HeadImage from '../components/Landing Components/WhyUs Section/HeadImage';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../components/shared/contexts/AuthContext';
import Banner from '../components/Landing Components/Verification Banner /Banner';
import VerifySnackbar from '../components/Landing Components/Verification Banner /VerifySnackbar';

const useStyles = makeStyles((theme) => ({
  headpage: {
    backgroundColor: theme.palette.primary.main,
  },
  introduction: {
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden',
    height: "100vh"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LandingPage = () => {
  const { state } = useContext(AuthContext);
  const { spinner, userInfo, isLoggedIn, emailSent } = state;
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" className={classes.headpage}>
        {isLoggedIn && !userInfo.emailVerified && !emailSent ? (
          <Banner />
        ) : null}
        <VerifySnackbar />

        {/* Introduction Page */}
        <Grid item>
          <Grid container direction="column" className={classes.introduction}>
            <Header />
            <Headline />
            <Waves />
          </Grid>
        </Grid>

        {/* Feature Page */}
        <Grid item>
          <Grid container direction="column" className={classes.headpage}>
            <HeadImage />
          </Grid>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={spinner}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LandingPage;
