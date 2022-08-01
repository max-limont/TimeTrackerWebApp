import { configureStore, combineReducers} from '@reduxjs/toolkit';
import calendarSlice from '../store/slice/calendar/calendarSlice';
import userListSlice from "../store/slice/user/userListSlice";

const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
  userList: userListSlice.reducer
})

export const store = configureStore({
  reducer: {
    rootReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
