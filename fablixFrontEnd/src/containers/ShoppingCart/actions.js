import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
} from './constants';

export const addToCart = (cred) => ({
  type: ADD_TO_CART,
  credential: cred,
});

export const addToCartSuccess = (data) => ({
  type: ADD_TO_CART_SUCCESS,
  data,
});

export const addToCartError = (error) => ({
  type: ADD_TO_CART_ERROR,
  error,
});
