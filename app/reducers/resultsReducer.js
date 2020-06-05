export function resultsReducer(prevState, action) {
  /**
   * TODO: standarize action to only receive type and payload
  */
  switch (action.type) {
    case "success":
      return {
        ...prevState,
        winner: action.players[0],
        loser: action.players[1],
        error: null,
        loading: false,
      };
    case "error":
      return {
        ...prevState,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error(action.error);
  }
}
;
