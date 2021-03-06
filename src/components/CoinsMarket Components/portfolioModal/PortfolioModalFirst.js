import { useState, useEffect, useContext, useRef } from "react";

import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { motion } from "framer-motion";

import { PortfolioContext } from "../../shared/contexts/PortfolioContext";
import { SearchBar } from "../../shared/UI components/SearchBar";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    background:
      "linear-gradient(20deg, rgba(87,95,153,1) 50%, rgba(255,147,213,1) 100%)",
    borderRadius: "2em",
    border: "4px solid",
    borderColor: theme.palette.primary.main,
  },
  mainContainerPaper: {
    borderRadius: "2em",
    backgroundColor: theme.palette.primary.light,
  },
  headlineContainer: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em",
    marginBottom: "1em",
    color: "white",
  },
  crossIconButton: {
    padding: "0px",
    color: "white",
  },
  searchBarContainer: {
    height: "2em",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
  },
  listContainer: {
    paddingLeft: "0.3em",
    paddingRight: "0.3em",
    width: "100%",
    color: "white",
  },
  iconContainer: {
    minWidth: "0px",
    color: "white",
  },
  logo: {
    width: "1.2em",
    marginRight: "1em",
  },
}));

export const PortfolioModalFirst = ({ listItemHandler, handleClose }) => {
  const { coinListResponse } = useContext(PortfolioContext);
  const classes = useStyles();
  const searchRef = useRef()
  const [searchSubmitTerm, setSearchSubmitTerm] = useState("");
  const [renderList, setRenderList] = useState([]);
  const matches450Down = useMediaQuery('(max-width:450px)');


  // Helper Functions
  const sortTopTen = (data) => {
    const sortedList = data
      .sort((a, b) => b.marketCap - a.marketCap)
      .slice(0, 10);
    return sortedList;
  };
  // Render List Logic
  useEffect(() => {
    const topten = sortTopTen(coinListResponse);
    const searchResult = coinListResponse.filter((coin) =>
      coin.name.toLowerCase().trim().includes(searchSubmitTerm)
    );

    // Default Case Top Ten By Market Cap
    if (
      searchResult.length === coinListResponse.length &&
      searchSubmitTerm === ""
    ) {
      setRenderList(topten);
    }

    // Search Render
    if (
      searchResult.length < coinListResponse.length &&
      searchSubmitTerm !== ""
    ) {
      setRenderList(searchResult.slice(0, 10)); // limited for avoiding overflow
    }

    // Not Found Case
    if (searchResult.length === 0 && searchSubmitTerm !== "") {
      setRenderList("No coin is found.");
    }
  }, [coinListResponse, searchSubmitTerm]);

  // DOM Handlers
  const searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    const query = searchRef.current.value.toLowerCase()
    setSearchSubmitTerm(query);
  };

  return (
    <Grid 
      container 
      className={classes.gridContainer}
      style={{width : matches450Down ? "20em" : "27em" }}>
      
      {/* Headline & Cross */}
      <Grid
        item
        container
        justify="space-between"
        className={classes.headlineContainer}
      >
        <Grid item>
          <Typography variant="h5">Select Coin</Typography>
        </Grid>

        <Grid item>
          <IconButton
            onClick={handleClose}
            classes={{ root: classes.crossIconButton }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Grid item container className={classes.searchBarContainer}>
        <SearchBar
          ref={searchRef}
          onSubmit={searchBoxSubmitHandler}
        />
      </Grid>

      {/* Coin List */}
      <Grid item container>
        <List className={classes.listContainer}>
          {typeof renderList === "object" ? (
            renderList.map((coin, i) => {
              return (
                <ListItem
                  button
                  key={coin.id}
                  component={motion.div}
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => listItemHandler(coin)}
                >
                  <img
                    src={coin.logo}
                    alt="coin logo"
                    className={classes.logo}
                  />
                  <ListItemText primary={coin.name} />
                  <ListItemIcon classes={{ root: classes.iconContainer }}>
                    <ArrowForwardIosIcon style={{ fontSize: "small" }} />
                  </ListItemIcon>
                </ListItem>
              );
            })
          ) : (
            <Typography style={{ padding: "3em" }} align="center">
              {" "}
              {renderList}
            </Typography>
          )}
        </List>
      </Grid>
    </Grid>
  );
};
