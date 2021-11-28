import axios from "axios";
const rulesURL = "/api/rules";

export const createRule = (rule) => async (dispatch) => {
  const payload = { add: [{ value: rule.newRule }] };
  dispatch({ type: "change_loading_status", payload: true });
  try {
    const response = await axios.post(rulesURL, payload);
    if (response.data.body.errors)
      dispatch({ type: "add_errors", payload: response.data.body.errors });
    else {
      dispatch({ type: "add_rule", payload: response.data.body.data });
    }
    dispatch({ type: "change_loading_status", payload: false });
  } catch (e) {
    dispatch({
      type: "add_errors",
      payload: [{ detail: e.message }],
    });
    dispatch({ type: "change_loading_status", payload: false });
  }
};

export const deleteRule = (id) => async (dispatch) => {
  const payload = { delete: { ids: [id] } };
  dispatch({ type: "change_loading_status", payload: true });
  await axios.post(rulesURL, payload);
  dispatch({ type: "delete_rule", payload: id });
  dispatch({ type: "change_loading_status", payload: false });
};
