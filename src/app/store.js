import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/products/ProductsSlice';
import cartReducer from '../features/cart/CartSlice';



export default configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    cart: cartReducer
  },
});
