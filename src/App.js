import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme'
import Footer from "./Pages/Footer"
import LandingPage from "./Pages/LandingPage"
import AuthPage from "./Pages/AuthPage"
import PortfolioPage from "./Pages/PortfolioPage"
import {GlobalProvider} from "./components/shared/global state/globalContext"
import CoinMarketPage from "./Pages/CoinsMarketPage"
import CoinPage from "./Pages/CoinPage"

const App = ()=> {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
        <GlobalProvider>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/coinmarkets" component={CoinMarketPage} />
            <Route exact path="/portfolio" component={PortfolioPage} />
            <Route exact path="/contact" component={()=> <div>Contact</div>} />
            <Route exact path="/auth" component={AuthPage} />
            <Route exact path="/currencies/:id" component={CoinPage} />
        </GlobalProvider>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App


