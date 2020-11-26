import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    status: 'empty',
    error: null
}
export const fetchProducts = createAsyncThunk('products/getProducts', async () =>{
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data
})
export const productSlice = createSlice({
  name: 'products',
 initialState,
  reducers: {
    storeProducts: (state, {payload}) =>{
        state.products.push(payload)
    }
  },

  extraReducers: {
    [fetchProducts.pending]: (state, action) =>{
        state.status = 'loading'
    },
    [fetchProducts.fulfilled]: (state, {payload}) =>{
      state.status = 'succeeded';
      state.products = payload
    },
    [fetchProducts.rejected] : (state, {error}) => {
      state.status = 'failed'
      state.error = error.message
    }
  }
});


export const selectAllProducts = state => state.product.products

export default productSlice.reducer;
