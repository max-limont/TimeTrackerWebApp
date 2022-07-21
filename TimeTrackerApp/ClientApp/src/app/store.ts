import { configureStore, combineReducers} from '@reduxjs/toolkit';
import calendarSlice from '../store/slice/calendar/calendarSlice';

const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
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
