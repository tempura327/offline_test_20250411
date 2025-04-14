import { configureStore } from '@reduxjs/toolkit';

import selectedFoodsReducer from './selectedFoodsSlice';

const store = configureStore({
  reducer: {
    selectedFoods: selectedFoodsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
