import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography, IconButton } from "@material-ui/core";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useFormatter } from "../shared/utils/formatterHook";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "0 1em",
  },
  logo: {
    width: "90%",
  },
  coinName: {
    color: theme.palette.common.white,
    fontSize: "2em",
    marginLeft: "0.2em",
  },
  coinCode: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.common.blue4,
    padding: "0.1em 0.3em",
    borderRadius: "0.3em",
    marginLeft: "0.5em",
  },
  favorite: {
    color: theme.palette.common.white,
  },
  icons: {
    color: theme.palette.common.white,
    fontSize: "1em",
    verticalAlign: "center",
  },
  linkText: {
    color: theme.palette.common.white,
    fontSize: "0.7em",
  },
  linkGrid: {
    backgroundColor: theme.palette.common.blue4,
    borderRadius: "0.5em",
    marginLeft: "0.5em",
    maxWidth: 120,
    padding: "0.2em 0.3em",
    marginTop: "0.3em",
    cursor: "pointer",
  },
  rightCode: {
    color: theme.palette.common.white,
    opacity: 0.8,
    fontSize: "0.8em",
    display: "inline-block",
    marginLeft: "1em",
  },
  rightChange: {
    display: "inline-block",
    color: theme.palette.common.white,
    marginLeft: "1em",
    backgroundColor: "green",
    borderRadius: "0.5em",
    padding: "0.2em 0.6em",
  },
  rightPrice: {
    display: "inline-block",
    color: theme.palette.common.white,
    fontSize: "2.5em",
    lineHeight: "1em",
  },
  progressContainer: {
    marginTop: "0.2em",
  },
  progress: {
    height: "0.8em",
    borderRadius: "1em",
    color: theme.palette.secondary.main,
  },
  high: {
    color: theme.palette.common.textPurple,
    fontSize: "0.9em",
  },
  low: {
    color: theme.palette.common.textPurple,
    fontSize: "0.9em",
  },
  menuPaperRoot: {
    marginTop: "3em",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "1em",
  },
  menuExplorerItem: {},
  explorerLinkRoot: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  selectedMenuItem: {},
}));

export const IntroductionBar = ({ singleCoinResponse }) => {
  const classes = useStyles();
  const { currencyFormatter } = useFormatter();
  const [anchorElExplorer, setAnchorElExplorer] = useState(null);
  const [anchorElCommunity, setAnchorElCommunity] = useState(null);
  const [anchorElSource, setAnchorElSource] = useState(null);
  const [formattedData, setFormattedData] = useState({});

  const matches750 = useMediaQuery("(max-width:750px)");
  const matches520 = useMediaQuery("(max-width:520px)");
  const matches375 = useMediaQuery("(max-width:375px)");
  const matches450 = useMediaQuery("(max-width:450px)");

  // Data Formatted & Editted
  useEffect(() => {
    setFormattedData({
      priceCurrent: currencyFormatter(
        singleCoinResponse?.data.market_data.current_price.usd
      ),
      priceChange:
        singleCoinResponse?.data.market_data.price_change_percentage_24h.toFixed(
          2
        ) + "%",
      coinCode: singleCoinResponse?.data.symbol.toUpperCase(),
      coinName: singleCoinResponse?.data.name,
      high24: singleCoinResponse?.data.market_data.high_24h.usd,
      low24: singleCoinResponse?.data.market_data.low_24h.usd,
      progresValue:
        ((singleCoinResponse?.data.market_data.current_price.usd -
          singleCoinResponse?.data.market_data.low_24h.usd) /
          (singleCoinResponse?.data.market_data.high_24h.usd -
            singleCoinResponse?.data.market_data.low_24h.usd)) *
        100,
      homepage: singleCoinResponse?.data.links.homepage[0],

      explorerLinks: singleCoinResponse?.data.links.blockchain_site,
      officialForumUrl: singleCoinResponse?.data.links.official_forum_url,
      redditForumUrl:
        singleCoinResponse?.data?.links?.subreddit_url?.toString(),
      repos: singleCoinResponse?.data.links.repos_url.github[0],
    });
  }, [singleCoinResponse, currencyFormatter]);

  // Dom Handlers
  const handleExplorerClick = (event) => {
    setAnchorElExplorer(event.currentTarget);
  };
  const handleExplorerClose = () => {
    setAnchorElExplorer(null);
  };
  const handleCommunityClick = (event) => {
    setAnchorElCommunity(event.currentTarget);
  };
  const handleCommunityClose = () => {
    setAnchorElCommunity(null);
  };
  const handleSourceClick = (event) => {
    setAnchorElSource(event.currentTarget);
  };
  const handleSourceClose = () => {
    setAnchorElSource(null);
  };

  // Responsiveness
  const linearProgressResponsive = () => {
    if (matches450) {
      return 3;
    }
    if (matches520) {
      return 5;
    }
    if (matches750) {
      return 6;
    }

    return 4;
  };

  return (
    <>
      <Grid
        container
        className={classes.mainContainer}
        justify="center"
        direction={matches750 ? "column" : "row"}
      >
        {/* Left */}
        <Grid
          item
          container
          xs
          style={{ display: matches750 ? "none" : "flex" }}
        >
          {/**  First Line **/}
          <Grid item container justify="flex-start" alignItems="center">
            <Grid item>
              <img
                src={singleCoinResponse?.data.image.small}
                alt="coin logo"
                className={classes.logo}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.coinName}>
                {singleCoinResponse?.data.name}
              </Typography>
            </Grid>
            <Grid item className={classes.coinCode}>
              <Typography>
                {singleCoinResponse?.data.symbol.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <StarBorderRoundedIcon className={classes.favorite} />
              </IconButton>
            </Grid>
          </Grid>

          {/**  Second Line **/}
          <Grid item container justify={matches750 ? "space-evenly" : null}>
            {/***  Homepage 1 ***/}
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.linkGrid}
            >
              <Grid item container xs={3} justify="center" alignItems="center">
                <LinkRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={6}>
                <Link
                  href={formattedData.homepage}
                  target="_blank"
                  rel="noopener"
                >
                  <Typography className={classes.linkText} align="center">
                    Homepage
                  </Typography>
                </Link>
              </Grid>
              <Grid item container xs={3} justify="center" alignItems="center">
                <LaunchRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>

            {/***  Explorer 2 ***/}
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.linkGrid}
              onClick={handleExplorerClick}
            >
              <Grid item container xs={3} justify="center" alignItems="center">
                <SearchRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.linkText} align="center">
                  Explorer
                </Typography>
              </Grid>
              <Grid item container xs={3} justify="center" alignItems="center">
                <ExpandMoreRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>
            <Menu
              anchorEl={anchorElExplorer}
              open={Boolean(anchorElExplorer)}
              onClose={handleExplorerClose}
              classes={{ paper: classes.menuPaperRoot }}
              className={classes.menuExplorer}
            >
              {formattedData.explorerLinks?.map((link) => {
                return link === "" ? null : (
                  <MenuItem
                    onClick={handleExplorerClose}
                    key={link}
                    className={classes.menuExplorerItem}
                    selected={false}
                  >
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={link}
                      underline="none"
                      classes={{ root: classes.explorerLinkRoot }}
                    >
                      {link.replace("https://", "").split("/")[0]}
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>

            {/*** Community 3 ***/}
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.linkGrid}
              onClick={handleCommunityClick}
            >
              <Grid item container xs={3} justify="center" alignItems="center">
                <PersonRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.linkText} align="center">
                  Community
                </Typography>
              </Grid>
              <Grid item container xs={3} justify="center" alignItems="center">
                <ExpandMoreRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>
            <Menu
              anchorEl={anchorElCommunity}
              open={Boolean(anchorElCommunity)}
              onClose={handleCommunityClose}
              classes={{ paper: classes.menuPaperRoot }}
              className={classes.menuExplorer}
            >
              {formattedData.officialForumUrl?.map((link) => {
                return link === "" ? null : (
                  <MenuItem
                    onClick={handleCommunityClose}
                    key={link}
                    className={classes.menuExplorerItem}
                  >
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={link}
                      underline="none"
                      classes={{ root: classes.explorerLinkRoot }}
                    >
                      {link.replace("https://", "").split("/")[0]}
                    </Link>
                  </MenuItem>
                );
              })}
              <MenuItem
                onClick={handleCommunityClose}
                className={classes.menuExplorerItem}
                classes={{ selected: classes.selectedMenuItem }}
              >
                <Link
                  target="_blank"
                  rel="noopener"
                  href={formattedData.redditForumUrl}
                  underline="none"
                  classes={{ root: classes.explorerLinkRoot }}
                >
                  {formattedData.redditForumUrl &&
                    formattedData.redditForumUrl
                      .replace("https://www.", "")
                      .split("/")[0]}
                </Link>
              </MenuItem>
            </Menu>

            {/***  Source Code 4 ***/}
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.linkGrid}
              onClick={handleSourceClick}
            >
              <Grid item container xs={2} justify="center" alignItems="center">
                <CodeRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.linkText} align="center">
                  Source Code
                </Typography>
              </Grid>
              <Grid item container xs={2} justify="center" alignItems="center">
                <ExpandMoreRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>
            <Menu
              anchorEl={anchorElSource}
              open={Boolean(anchorElSource)}
              onClose={handleSourceClose}
              classes={{ paper: classes.menuPaperRoot }}
              className={classes.menuExplorer}
            >
              <MenuItem
                onClick={handleSourceClose}
                className={classes.menuExplorerItem}
              >
                <Link
                  target="_blank"
                  rel="noopener"
                  href={formattedData.repos}
                  underline="none"
                  classes={{ root: classes.explorerLinkRoot }}
                >
                  {formattedData.repos
                    ? formattedData.repos.replace("https://", "").split("/")[0]
                    : null}
                </Link>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>

        {/* Right */}
        <Grid item xs container direction="column">
          {/** Coin Code **/}
          <Grid
            item
            container
            directiton="column"
            justify="flex-end"
            style={{ display: matches750 ? "none" : "flex" }}
          >
            <Grid item>
              <Typography align="right" className={classes.rightCode}>
                {formattedData.coinName} ({formattedData.coinCode})
              </Typography>
            </Grid>
          </Grid>

          {/** Price & Change Info **/}
          <Grid
            item
            container
            direction="row"
            justify={matches750 ? "space-between" : "flex-end"}
            alignItems="center"
            style={{ marginTop: matches750 ? "1em" : "0" }}
          >
            {/*** Responsive Logo  ***/}
            <Grid
              item
              container
              style={{ display: matches750 ? "flex" : "none" }}
              xs={4}
            >
              <Grid item>
                <img
                  src={singleCoinResponse?.data.image.small}
                  alt="coin logo"
                  className={classes.logo}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.coinName}>
                  {singleCoinResponse?.data.name}
                </Typography>
              </Grid>
            </Grid>

            {/*** Big Price & Change  ***/}
            <Grid
              item
              container
              xs={matches750 ? 8 : 12}
              alignItems="center"
              justify="flex-end"
            >
              {/**  Big Price **/}
              <Grid item>
                <Typography align="right" className={classes.rightPrice}>
                  {formattedData.priceCurrent}
                </Typography>
              </Grid>

              {/** Price Change  **/}
              <Grid item>
                <Typography align="right" className={classes.rightChange}>
                  {formattedData.priceChange}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/**  Low & High Info **/}
          <Grid
            item
            container
            justify={matches750 ? "space-between" : "flex-end"}
            alignItems="center"
            spacing={2}
            className={classes.progressContainer}
          >
            <Grid item>
              <span className={classes.low}>
                Low:&nbsp;
                <span
                  style={{ color: "white", fontWeight: "bold", opacity: 1 }}
                >
                  {currencyFormatter(formattedData.low24)}
                </span>
              </span>
            </Grid>

            <Grid
              item
              // md={5}
              // sm={matches750 ? 7 : 4}
              // xs={matches500 ? 5 : 7}
              xs={linearProgressResponsive()}
              className={classes.progressGrid}
            >
              <LinearProgress
                color="secondary"
                className={classes.progress}
                variant="determinate"
                value={formattedData.progresValue || 0}
              />
            </Grid>

            <Grid item>
              <span className={classes.high}>
                High:&nbsp;
                <span
                  style={{ color: "white", fontWeight: "bold", opacity: 1 }}
                >
                  {currencyFormatter(formattedData.high24)}
                </span>
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
