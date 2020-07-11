import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducer";

const loggerMiddleware = createLogger();

const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware, loggerMiddleware)))
export default store