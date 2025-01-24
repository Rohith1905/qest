const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER_DETAILS":
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  