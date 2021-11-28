import axios from "axios";

const getRules = "http://localhost:3001/api/rules";

const postRules = "http://localhost:3001/api/rules";

export const fetchRules = () => axios.get(getRules);

export const addRules = (newRule) => axios.post(postRules, newRule);
