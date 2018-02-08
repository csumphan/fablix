import {
  UPDATE_CART,
  UPDATE_CART_ERROR,
  CLEAR_CART,
  ADD_ONE_CART,
  DELETE_CART_ITEM,
} from './constants';

export const updateCart = (data) => ({
  type: UPDATE_CART,
  data
});

export const addOneCart = (data) => ({
  type: ADD_ONE_CART,
  data
});

export const deleteCartItem = (data) => ({
  type: DELETE_CART_ITEM,
  data
});

export const updateCartError = (error) => ({
  type: UPDATE_CART_ERROR,
  error,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
