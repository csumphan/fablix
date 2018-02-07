import {
  UPDATE_CART,
  UPDATE_CART_ERROR,
} from './constants';

export const updateCart = (movie) => ({
  type: UPDATE_CART,
  movie
});

export const updateCartError = (error) => ({
  type: UPDATE_CART_ERROR,
  error,
});
