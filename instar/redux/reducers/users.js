const initialState = {
  currrentUser: null,
};

export const user = (state = initialState, action) => {
  return {
    ...state,
    currrentUser: action.currrentUser,
  };
};
