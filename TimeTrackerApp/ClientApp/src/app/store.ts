import { configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit';
import { authSlice } from '../store/slice/authentication/authSlice';
import { combineEpics, createEpicMiddleware, ofType } from "redux-observable";
import calendarSlice from '../store/slice/calendar/calendarSlice';
import { authEpics } from '../store/slice/epics/auth/authEpics';
import { Cookies } from 'react-cookie';



const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(authEpics);

const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
  auth: authSlice.reducer
})

export const store = configureStore({
  reducer: {
    rootReducer
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,
  }).concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;