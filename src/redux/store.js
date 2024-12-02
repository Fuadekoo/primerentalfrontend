import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import alertsSlice from "./alertSlice";

const rootReducer = combineReducers({
  alerts: alertsSlice,
  users: usersSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
