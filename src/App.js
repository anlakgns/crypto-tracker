import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from './theme'
import {PortfolioProvider} from "./components/shared/contexts/PortfolioContext"
import {AuthProvider} from "./components/shared/contexts/AuthContext"

import Footer from "./components/Footer"
import LandingPage from "./Pages/LandingPage"
import AuthPage from "./Pages/AuthPage"
import PortfolioPage from "./Pages/PortfolioPage"
import CoinMarketPage from "./Pages/CoinsMarketPage"
import SingleCoinPage from "./Pages/SingleCoinPage"

const useStyles = makeStyles({
  main: {
    backgroundColor: "#2E3880"
  },

})

const App = ()=> {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <BrowserRouter>
          <div className={classes.containerDiv}>
            <Switch>
              <PortfolioProvider>
                <AuthProvider>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/coinmarket" component={CoinMarketPage} />
                  <Route exact path="/portfolio" component={PortfolioPage} />
                  <Route exact path="/currencies/:id" component={SingleCoinPage} />
                  <Route exact path="/auth" component={AuthPage} />
                </AuthProvider>
              </PortfolioProvider>
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App


