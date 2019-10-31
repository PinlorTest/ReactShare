import { createStore, combineReducers, applyMiddleware } from "redux"
import reducers from "./Reducers"
// import { createLogger } from 'redux-logger';

// 创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
const store = createStore(combineReducers(reducers))

export default store
