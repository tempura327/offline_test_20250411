import { configureStore } from '@reduxjs/toolkit';

import foodMenuReducer from './foodMenuSlice';

const store = configureStore({
  reducer: {
    foodMenu: foodMenuReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
