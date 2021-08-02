import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from './theme'
import Footer from "./components/Footer"
import LandingPage from "./Pages/LandingPage"
import AuthPage from "./Pages/AuthPage"
import PortfolioPage from "./Pages/PortfolioPage"
import {PortfolioProvider} from "./components/shared/contexts/PortfolioContext"
import {AuthProvider} from "./components/shared/contexts/AuthContext"
import CoinMarketPage from "./Pages/CoinsMarketPage"
import CoinPage from "./Pages/CoinPage"

const useStyles = makeStyles({
  main: {
    backgroundColor: "#2E3880"
  },
  containerDiv:{
    maxWidth:"1500px",
    margin:"auto"
  }
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
                    <Route exact path="/coinmarkets" component={CoinMarketPage} />
                      <Route exact path="/portfolio" component={PortfolioPage} />
                      <Route exact path="/currencies/:id" component={CoinPage} />
                    <Route exact path="/contact" component={()=> <div>Contact</div>} />
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


