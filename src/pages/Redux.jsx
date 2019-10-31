import React from "react"
import { connect } from "react-redux"
import store from "../model/store"
import { changeValueAC } from "../model/Actions"

class App extends React.Component {
  handleAdd = () => {
    store.dispatch(changeValueAC(1))
  }
  render() {
    console.log(store.getState())
    const { value } = this.props
    console.log(value)
    return (
      <div className="App">
        <div style={{ fontSize: "20px", marginTop: "50px" }}>
          目前显示的数字为{value}
        </div>
        <button
          onClick={this.handleAdd}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          增加1
        </button>
      </div>
    )
  }
}

App = connect(state => ({
  value: state.changeValueRC.value
}))(App)

export default App
