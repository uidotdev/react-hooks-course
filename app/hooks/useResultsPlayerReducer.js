import React from "react";
import { battle } from "../utils/api";
import { resultsReducer } from "../reducers/resultsReducer";


export function useResultsPlayerReducer(playerOne = null, playerTwo = null) {
  const [state, dispatch] = React.useReducer(resultsReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });
  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then((players) => {
        dispatch({ type: "success", players });
      })
      .catch(({ message }) => {
        dispatch({ type: "error", error: message });
      });
  }, [playerOne, playerTwo]);
  // state => {winner, loser, error, loading}, 
  // dispatch => (type: ["success" || "error"], error: String, |players: [ |objects]( lenght: 2))
  return [state, dispatch];
}
