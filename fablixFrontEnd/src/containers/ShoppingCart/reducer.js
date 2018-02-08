
// const data = {
//   movie: movieData,
//   count: 1
// }

import {
  UPDATE_CART,
  UPDATE_CART_ERROR,
  CLEAR_CART,
  ADD_ONE_CART,
  DELETE_CART_ITEM,
} from './constants';

const initialState = {
  shoppingCartData: [],
  shoppingCartError: null,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CART: {
      const initState = { ...initialState };
      return initState;
    }
    case UPDATE_CART: {
      const movieData = action.data;
      const currentCart = [...state.shoppingCartData];

      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].movie.id === movieData.movie.id) {
          currentCart[i].count = movieData.count;
          return {
            ...state,
            shoppingCartData: currentCart,
            shoppingCartError: null,
          };
        }
      }
      currentCart.push({
        movie: movieData.movie,
        count: movieData.count
      });
      return {
        ...state,
        shoppingCartData: currentCart,
        shoppingCartError: null,
      };
    }
    case ADD_ONE_CART: {
      const movieData = action.data;
      const currentCart = [...state.shoppingCartData];

      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].movie.id === movieData.movie.id) {
          currentCart[i].count += 1;
          return {
            ...state,
            shoppingCartData: currentCart,
            shoppingCartError: null,
          };
        }
      }
      currentCart.push({
        movie: movieData.movie,
        count: 1
      });
      return {
        ...state,
        shoppingCartData: currentCart,
        shoppingCartError: null,
      };
    }
    case DELETE_CART_ITEM: {
      const movieData = action.data;
      // const currentCart = [...state.shoppingCartData];

      const currentCart = state.shoppingCartData.filter((current) => {
        return current.movie.id !== movieData.movie.id;
      });
      return {
        ...state,
        shoppingCartData: currentCart,
        shoppingCartError: null,
      };
    }
    case UPDATE_CART_ERROR:
      return {
        ...state,
        shoppingCartError: action.error
      };
    default:
      return state;
  }
};

export default shoppingCartReducer;
