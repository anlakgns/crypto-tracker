import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GithubIcon from '@material-ui/icons/GitHub';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    fontFamily: 'roboto',
    backgroundColor: theme.palette.common.blue1,
  },
  innerMain: {
    maxWidth: '1500px',
    margin: 'auto',
  },
  linkContainer: {
    padding: '3em',
    color: theme.palette.common.textPurple,
    lineHeight: '1.4em',
  },
  coinOne: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    zIndex: '100',
  },
  one: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
  coinOneText: {
    lineHeight: '1.4rem',
    marginBottom: '1.2rem',
    textAlign: 'center',
  },
  contactUs: {
    marginBottom: '1.5rem',
    color: 'white',
    fontWeight: 'bold',
    zIndex: '100',
  },
  quickLinks: {
    marginBottom: '1.5rem',
    color: 'white',
    fontWeight: 'bold',
    zIndex: '100',
  },
  coinOneIcon: {
    width: '2rem',
    height: '2rem',
    marginRight: '0.6rem',
    textDecoration: 'none',
    color: theme.palette.common.textPurple,
  },
  copyRight: {
    textAlign: 'center',
    padding: '2rem',
    color: theme.palette.common.textPurple,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matchesSMdown = useMediaQuery(theme.breakpoints.down('sm'));

  const logoHandler = () => {
    history.push('/');
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={classes.footerContainer}>
      <Grid
        container
        className={classes.innerMain}
        direction={matchesSMdown ? 'column' : 'row'}
        justify="center"
        alignItems="center"
      >
        {/** Description Part **/}
        <Grid item container md={4} sm={8} className={classes.mainItem}>
          <Grid
            alignItems="center"
            container
            direction="column"
            className={classes.linkContainer}
          >
            <Grid
              item
              className={classes.coinOne}
              onClick={logoHandler}
              style={{ cursor: 'pointer' }}
            >
              <span>Coin</span>
              <span className={classes.one}>Tracker</span>
            </Grid>
            <Grid item className={classes.coinOneText}>
              CoinTracker offers user friendly charts with real-time prices. You
              can easily manage your portfolio and watchlist.
            </Grid>
            <Grid item className={classes.coinOneIcons}>
              <Grid container>
                <Grid item>
                  <Icon
                    component="a"
                    href="http://www.facebook.com"
                    target="_blank"
                  >
                    <FacebookIcon className={classes.coinOneIcon} />
                  </Icon>
                </Grid>
                <Grid item>
                  <Icon
                    component="a"
                    href="http://www.twitter.com"
                    target="_blank"
                  >
                    <TwitterIcon className={classes.coinOneIcon} />
                  </Icon>
                </Grid>
                <Grid item>
                  <Icon
                    component="a"
                    href="http://www.instagram.com"
                    target="_blank"
                  >
                    <InstagramIcon className={classes.coinOneIcon} />
                  </Icon>
                </Grid>
                <Grid item>
                  <Icon
                    component="a"
                    href="http://www.github.com"
                    target="_blank"
                  >
                    <GithubIcon className={classes.coinOneIcon} />
                  </Icon>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/** ContactUs Part **/}
        <Grid item md={4} className={classes.mainItem}>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.linkContainer}
          >
            <Grid item className={classes.contactUs}>
              CONTACT US
            </Grid>
            <Grid item>330 Franklin Road,</Grid>
            <Grid item>Suite 135A, Brentwood,</Grid>
            <Grid item>TN 37027-5237</Grid>
            <Grid item>Phone: 615.555.5555</Grid>
            <Grid item>Email: info@cointracker.com</Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.copyRight}>
        Copyright © 2021. All rights reserved. CoinOne LLC
      </div>
    </footer>
  );
};

export default Footer;
