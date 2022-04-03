import logger from 'redux-logger';//日志信息
import thunk from 'redux-thunk';//异步操作
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from "redux";
import rootReducer from '../reducers';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));//reducers