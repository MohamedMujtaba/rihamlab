import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      // FIXME:
      let item = action.payload;
      state.cartItems = [...state.cartItems, item];
      state.amount += item.price;
    },
    REMOVE_FROM_CART: (state, action) => {
      const { _id, price, wanted } = action.payload;
      let items = state.cartItems;
      let newItems = items.filter((item) => item._id !== _id);
      const totalPrice = price; //+ wanted.map((i) => +i.price).reduce((a, b) => a + b, 0);
      state.cartItems = newItems;
      state.amount -= totalPrice;
    },
    SUBTEST: (state, action) => {
      const subTest = action.payload[0];
      const id = action.payload[1];
      const isTrue = action.payload[2];
      let items = state.cartItems;
      let test = items.find((i) => i._id === id);
      if (isTrue) {
        test.wanted = [...test.wanted, subTest];
        test.price += +subTest.price;
        state.amount += +subTest.price;
      }
      if (!isTrue) {
        const newTests = test.wanted.filter((i) => i.id !== subTest.id);
        test.wanted = newTests;
        test.price -= +subTest.price;
        state.amount -= +subTest.price;
      }

      console.log(test.wanted);
    },
  },
});

export const { ADD_TO_CART, REMOVE_FROM_CART, SUBTEST } = cartSlice.actions;
export default cartSlice.reducer;
