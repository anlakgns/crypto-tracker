import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import featurePic from '../../../assets/FeaturePic.png';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  headAll: {
    maxWidth: '1500px',
    margin: 'auto',
    marginTop: '-5em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-2em',
    },
  },
  image: {
    display: 'block',
    overflow: 'hidden',
    marginBottom: '15em',

    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: 'auto',
      marginBottom: '15em',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: 'auto',
      marginBottom: '0em',
    },
  },
  whycoin: {
    color: theme.palette.secondary.main,
    fontWeight: '600',
    fontSize: '1em',
    marginTop: '2em',
    marginBottom: '1.6em',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginTop: '0em',
    },
  },
  headline: {
    color: 'white',
    fontWeight: '300',
    marginBottom: '0.8em',
    fontSize: 'clamp(32px, 8vw, 48px)',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  subtitle: {
    color: theme.palette.common.textPurple,
    textAlign: 'left',
    lineHeight: '1.6em',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      width: '80%',
      margin: 'auto',
    },
  },
  missionButton: {
    background:
      'linear-gradient(135deg, rgba(249,110,198,1) 0%, rgba(213,50,166,1) 100%)',
    width: '12em',
    height: '3.5em',
    color: 'white',
    textTransform: 'none',
    fontSize: '0.9em',
    marginTop: '3em',
    marginBottom: '10em',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: 'auto',
      marginBottom: '8em',
      marginTop: '3em',
    },
  },
  imageContainer: {
    marginRight: '2em',
    marginTop: '6em',
    marginBottom: '1em',
    display: 'flex',
  },
}));

const HeadImage = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Grid item className={classes.headAll}>
        <Grid container direction="row" justify="center" alignItems="center">
          {/* Image  */}
          <Grid item md={6} lg={5} xl={4} className={classes.imageContainer}>
            <img
              src={featurePic}
              className={classes.image}
              alt="background pattern"
            />
          </Grid>

          {/* Text */}
          <Grid item md={5} lg={4} xl={4}>
            <Typography className={classes.whycoin}>WHY COINTRACKER</Typography>
            <Typography className={classes.headline}>
              Easily Manage Your Portfolio With Beautiful Interfaces
            </Typography>
            <Typography className={classes.subtitle}>
              We offer the first 100 cryptocoins having highest market cap with
              real time data option. You can easily track the prices and other
              related information about coins.
              <br />
              <br />
              Our aim is to present the user-friendly interfaces and offer the
              best charts so that portolio owners can easily track their
              portfolio performance. With this purpose we do our best to design
              the most meaningful charts for you.
            </Typography>
            <Button
              variant="contained"
              className={classes.missionButton}
              onClick={() => history.push('portfolio')}
            >
              Build Your Portfolio
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HeadImage;
