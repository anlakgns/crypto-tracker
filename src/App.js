import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme'
import Footer from "./Pages/Footer"
import LandingPage from "./Pages/LandingPage"
import NewsPage from "./Pages/NewsPage"
import AuthPage from "./Pages/AuthPage"
import PortfolioPage from "./Pages/PortfolioPage"
import {GlobalProvider} from "./components/shared/global state/globalContext"
import CoinListPage from "./Pages/CoinsListPage"

const App = ()=> {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
        <GlobalProvider>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/features" component={()=> <div>Features</div>} />
            <Route exact path="/coinmarkets" component={CoinListPage} />
            <Route exact path="/news" component={NewsPage} />
            <Route exact path="/portfolio" component={PortfolioPage} />
            <Route exact path="/contact" component={()=> <div>Contact</div>} />
            <Route exact path="/auth" component={AuthPage} />
        </GlobalProvider>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App


