import { combineReducers } from "redux";
import ruleReducer from "./rules";
import tweetReducer from "./tweets";

const allReducers = combineReducers({
  rules: ruleReducer,
  tweets: tweetReducer,
});

export default allReducers;
