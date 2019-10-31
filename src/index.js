import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import store from "./store"
import { Provider } from "react-redux"

class AppIndex extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<AppIndex />, document.getElementById("root"))
serviceWorker.unregister()
