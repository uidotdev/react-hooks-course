export function popularReducer(state, action) {
  switch (action.type) {
    case "success":
      return { ...state, [action.selectedLanguage]: action.repos };
    case "error":
      return { ...state, error: action.error.message };
    default:
      throw new Error("Action doesn exist");
  }
}
