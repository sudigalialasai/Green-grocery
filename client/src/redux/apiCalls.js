import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { OrderStart, OrderSuccess, OrderFailure } from "./orderRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { delCart } from "./cartRedux";
import { setSearch } from "./ProducRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "http://localhost:5000/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const lgout = (dispatch) => {
  dispatch(logout());
};

export const clearCart = (dispatch) => {
  dispatch(delCart());
};

export const addOrder = async (order, dispatch) => {
  dispatch(OrderStart());
  try {
    const res = await publicRequest.post(`/orders`, order);
    dispatch(OrderSuccess(res.data));
  } catch (err) {
    dispatch(OrderFailure());
  }
};

export const setsearchstr = (searchString) => {
  return  (dispatch) => {
    try {
      const searchData = searchString;

      dispatch(setSearch({ searchData }));
    } catch (err) {
      console.error("Error fetching search data:", err);
    }
  };
};
