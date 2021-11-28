import socketIOClient from "socket.io-client";

export const streamTweets = () => async (dispatch) => {
  let socket;
  socket = socketIOClient("http://localhost:3001/");

  socket.on("connect", () => {});

  socket.on("tweet", (json) => {
    if (json.data) {
      dispatch({ type: "add_tweet", payload: json });
    }
  });

  socket.on("heartbeat", (data) => {
    dispatch({ type: "update_waiting" });
  });

  socket.on("error", (data) => {
    dispatch({ type: "show_error", payload: data });
  });

  socket.on("authError", (data) => {
    console.log("data =>", data);
    dispatch({ type: "add_errors", payload: [data] });
  });
};
