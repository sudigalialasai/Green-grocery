import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    search: "",
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL

    setSearch(state, action) {
      // console.log("got action", action);
      state.search = action.payload.searchData;
      // const search = useSelector((state) => state.product.search);
      // console.log(search);
    },
  },
});

export const { setSearch } = productSlice.actions;

export default productSlice.reducer;
