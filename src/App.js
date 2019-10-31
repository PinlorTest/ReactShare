import React from "react"
import { createBrowserHistory } from "history"
import { Router, Route, Switch } from "react-router-dom"
import Redux from "./pages/Redux"
import Modal from "./pages/Modal"
import "./App.css"

export const history = createBrowserHistory()

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Redux} />
            <Route exact path="/modal" component={Modal} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
