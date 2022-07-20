import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../store/slice/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
