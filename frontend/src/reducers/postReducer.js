const initialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_POSTS_SUCCESS":
        return { ...state, posts: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default postReducer;