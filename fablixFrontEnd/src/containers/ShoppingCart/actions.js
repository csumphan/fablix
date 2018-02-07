import {
  UPDATE_CART,
  UPDATE_CART_ERROR,
  CLEAR_CART,
} from './constants';

export const updateCart = (data) => ({
  type: UPDATE_CART,
  data
});

export const updateCartError = (error) => ({
  type: UPDATE_CART_ERROR,
  error,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
