const { combineReducers } = require("redux");
const { default: userReducer } = require("./user");

const rootReducer = combineReducers({
    userReducer,
});
export default rootReducer;