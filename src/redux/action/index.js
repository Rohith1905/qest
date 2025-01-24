// For Add Item to Cart
export const addCart = (product) => {
    return {
      type: "ADDITEM",
      payload: product,
    };
  };
  
  // For Delete Item to Cart
  export const delCart = (product) => {
    return {
      type: "DELITEM",
      payload: product,
    };
  };
  
  // New action to empty the cart
  export const emptyCart = () => {
    return {
      type: "EMPTYCART",
    };
  };
  
  export const setUserDetails = (userDetails) => {
    return {
      type: "SET_USER_DETAILS",
      payload: userDetails,
    };
  };
  