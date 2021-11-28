import React, { useEffect } from "react";
import Tweet from "./Tweet";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { streamTweets } from "../actions/tweets";

const TweetFeed = () => {
  const state = useSelector((state) => state.tweets);
  const dispatch = useDispatch();

  const { tweets, error, isWaiting } = state;
  const reconnectMessage = () => {
    const message = {
      title: "Reconnecting",
      detail: "Please wait while we reconnect to the stream.",
    };

    if (error && error.detail) {
      return (
        <div>
          <ErrorMessage
            key={message.title}
            error={message}
            styleType="success"
          />
          <Spinner />
        </div>
      );
    }
  };

  const errorMessage = () => {
    const { errors } = state;

    if (errors && errors.length > 0) {
      return errors.map((error) => (
        <ErrorMessage key={error.title} error={error} styleType="negative" />
      ));
    }
  };

  const waitingMessage = () => {
    const message = {
      title: "Still working",
      detail: "Waiting for new Tweets to be posted",
    };

    if (isWaiting) {
      return (
        <React.Fragment>
          <div className="ui">
            <ErrorMessage
              key={message.title}
              error={message}
              styleType="success"
            />
          </div>
          <Spinner />
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    dispatch(streamTweets());
  }, [dispatch]);

  const handleClick = () => {
    tweets.splice(0, tweets.length);
  };

  const loadmore = () => {
    if (tweets.length > 25) {
      return (
        <React.Fragment>
          <div className="ui two container column centered padded grid">
            <button
              className="ui circular twitter icon button"
              data-class="animated fade, animated"
              style={{ marginTop: "10px" }}
              onClick={handleClick}
            >
              <i className="arrow up icon"></i> Load More{" "}
              <div class="ui tiny blue label">+{tweets.length - 25}</div>
            </button>
          </div>
        </React.Fragment>
      );
    }
  };

  const showTweets = () => {
    if (tweets.length > 0) {
      return (
        <React.Fragment>
          {tweets.slice(-25).map((tweet) => (
            <Tweet key={tweet.data.id} json={tweet} />
          ))}
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      {reconnectMessage()}
      {errorMessage()}
      {waitingMessage()}
      {loadmore()}
      {showTweets()}
    </div>
  );
};

export default TweetFeed;
