import React, { useEffect, useState } from "react";
import * as api from "../api";
import Rule from "./Rule";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { createRule, deleteRule } from "../actions/rules";

const RuleList = () => {
  const state = useSelector((state) => state.rules);

  const [rule, setRules] = useState({
    rules: [],
    newRule: "",
    isLoading: false,
    errors: [],
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRule(rule));
  };

  const handleDelete = (e) => {
    dispatch(deleteRule(e));
  };

  const errors = () => {
    const { errors } = state;

    if (errors && errors.length > 0) {
      return errors.map((error) => (
        <ErrorMessage key={error.title} error={error} styleType="negative" />
      ));
    }
  };

  const rules = () => {
    const { isLoading, rules } = state;

    const message = {
      title: "No tags present",
    };

    if (!isLoading) {
      if (rules && rules.length > 0) {
        return (
          <div className="ui fluid segment">
            Showing results for :{"  "}
            {rules.map((rule) => (
              <Rule
                key={rule.id}
                data={rule}
                onRuleDelete={(id) => handleDelete(id)}
              />
            ))}
          </div>
        );
      } else {
        return (
          <ErrorMessage
            key={message.title}
            error={message}
            styleType="warning"
          />
        );
      }
    } else {
      return <Spinner />;
    }
  };

  useEffect(() => {
    (async () => {
      dispatch({ type: "change_loading_status", payload: true });

      try {
        const { data } = await api.fetchRules();
        const { data: payload = [] } = data.body;
        dispatch({
          type: "show_rules",
          payload,
        });
      } catch (e) {
        dispatch({ type: "add_errors", payload: [e.response.data] });
      }

      dispatch({ type: "change_loading_status", payload: false });
    })();
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ui fluid action input">
          <input
            type="text"
            autoFocus={true}
            value={rule.newRule}
            onChange={(e) => setRules({ newRule: e.target.value })}
          />
          <button type="submit" className="ui primary button">
            <i class="search icon"></i> Search Tweets
          </button>
        </div>
        {errors()}
        {rules()}
      </form>
    </div>
  );
};

export default RuleList;
