import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import counterslice from "src/modules/slice/counterSlice";
import roomSlice from "src/modules/slice/roomSlice";
import userSlice from "src/modules/slice/userSlice";

const logger = createLogger();

const rootReducer = combineReducers({
  counter: counterslice.reducer,
  room: roomSlice.reducer,
  user: userSlice.reducer,
});

// setup 関数を用意してエクスポートする。
export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(logger);
    },
  });

  return store;
};
