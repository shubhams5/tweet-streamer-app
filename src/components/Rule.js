import React from "react";

export const Rule = ({ data, onRuleDelete }) => {
  return (
    <>
      <div className="ui label">
        {data.value}{" "}
        <i
          className="close icon nagtive button"
          onClick={() => onRuleDelete(data.id)}
        ></i>
      </div>
    </>
  );
};

export default Rule;
