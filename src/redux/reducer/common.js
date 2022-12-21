export const onSuccess = (state, action) => {
  return {
      ...state,
      data: action.payload,
      isLoading: false
  };
};

export const onFailure = (state, action) => {
  return {
      ...state,
      errorData: action.payload,
      error: true,
      isLoading: false
  }
}