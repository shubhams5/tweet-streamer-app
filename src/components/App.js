import React from "react";
import TweetFeed from "./TweetFeed";
import RuleList from "./RuleList";
import { useSelector } from "react-redux";

const App = () => {
  const state = useSelector((state) => state.tweets);
  const { tweets } = state;
  return (
    <div className="ui container">
      <div className="introduction"></div>

      <h1 className="ui header">
        <div className="ui right aligned grid">
          <div className="left floated left aligned six wide column content">
            <i class="twitter icon" style={{ color: "#1d9bf0" }}></i> Tweet
            Streamer App
          </div>
          <div class="ui right floated right aligned six wide column">
            <i class="icon bell blue outline"></i>
            {tweets.length > 25 ? (
              <div
                class="ui red tiny circular floating label"
                style={{ top: "12px", left: "97%" }}
              >
                {tweets.length - 25}
              </div>
            ) : (
              <div
                class="ui red empty circular floating label"
                style={{ top: "15px", left: "97%" }}
              ></div>
            )}
          </div>
        </div>
      </h1>

      <div className="ui container">
        <RuleList />
        <TweetFeed />
      </div>
    </div>
  );
};

export default App;
