import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalStyle } from "./utils/GlobalStyle"
import { Provider } from "react-redux"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import store from "./utils/store"

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
