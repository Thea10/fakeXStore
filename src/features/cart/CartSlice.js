import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  cartItems: [],
  cartTotal: 0,
  status: "none",
  error: null,
};

export const fetchItems = createAsyncThunk("cart/getCart", async () => {
  const response = JSON.parse(localStorage.getItem("fakeXCartItems"));
  if (!response) {
    return [];
  } else {
    return response;
  }
});

function getTotal(cart) {
  return cart.reduce((acc, items) => acc + items.price * items.count, 0).toFixed(0);
}

function updateStorage(item) {
  localStorage.setItem("fakeXCartItems", JSON.stringify(item));
}

function saveToStorage(cart) {
  let localCart = JSON.parse(localStorage.getItem("fakeXCartItems"));
  if (!localCart) {
    updateStorage([cart]);
  } else {
    let checkItem = _.find(localCart, (item) => item.id === cart.id);
    !checkItem ? updateStorage(localCart.push(cart)) : (checkItem.count += 1);
    updateStorage(localCart);
  }
}

function deleteFromStorage(cart) {
  let localCart = JSON.parse(localStorage.getItem("fakeXCartItems"));

  let checkItem = _.find(localCart, (item) => item.id === cart.id);
  checkItem.count < 2
    ? updateStorage(
        (localCart = _.filter(localCart, (item) => item.id !== cart.id))
      )
    : (checkItem.count -= 1);
  updateStorage(localCart);
}
// export const payForProducts = createAsyncThunk(
//   "cart/pay",
//   async (price, quantity) => {
//     const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
//     console.log(stripePromise);

//     const stripe = await stripePromise;

//     const response = await axios.post(
//       `http://localhost:4242/create-checkout-session/${price}/${quantity}`,
//       { price: price.toFixed(), item_quantity: quantity },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const session = await response.json();

//     // When the customer clicks on the button, redirect them to Checkout.
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (result.error) {
//       return result.error;
//     }
//   }
// );

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    storeCart: (state, { payload }) => {
      state.cartItems.push(payload);
    },
    incrementItemCount: (state, { payload }) => {
      let cartItem = _.find(state.cartItems, (item) => item.id === payload.id);
      if (!cartItem) {
        state.cartItems.push({ ...payload, count: 1 });
        saveToStorage({ ...payload, count: 1 });
      } else {
        cartItem.count += 1;
        // cartItem.price = cartItem.price * cartItem.count;
        saveToStorage(cartItem);
      }
    },
    decrementItemCount: (state, { payload }) => {
      let cartItem = _.find(state.cartItems, (item) => item.id === payload.id);

      if (cartItem.count < 2) {
        state.cartItems = _.filter(
          state.cartItems,
          (item) => item.id !== payload.id
        );
        deleteFromStorage(payload);
      } else {
        cartItem.count -= 1;
        deleteFromStorage(cartItem);
      }
    },
    removeItem: (state, { payload }) => {
      state.cartItems = _.filter(
        state.cartItems,
        (item) => item.id !== payload.id
      );

      updateStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
      localStorage.removeItem("fakeXCartItems");
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchItems.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.cartItems = payload;
    },
    [fetchItems.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    },
  },
});

export const selectCart = (state) => state.cart.cartItems;
export const selectCartTotal = (state) => getTotal(state.cart.cartItems);

export const {
  incrementItemCount,
  decrementItemCount,
  removeItem,
  clearCart,
} = cartSlice.actions;

// const getTotal = cart => (dispatch) => {
//   dispatch(getCartTotal(cart))
// };

export default cartSlice.reducer;
