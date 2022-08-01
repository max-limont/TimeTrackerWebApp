<<<<<<< HEAD
import { configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit';
import { authSlice } from '../store/slice/authentication/authSlice';
import { combineEpics, createEpicMiddleware, ofType } from "redux-observable";
import calendarSlice from '../store/slice/calendar/calendarSlice';
import { authEpics } from '../store/slice/epics/auth/authEpics';
import { Cookies } from 'react-cookie';
import { userEpics } from '../store/slice/epics/user/userEpics';



const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(authEpics,userEpics);


const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
  auth: authSlice.reducer
=======
import { configureStore, combineReducers} from '@reduxjs/toolkit';
import calendarSlice from '../store/slice/calendar/calendarSlice';

const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
>>>>>>> 9bad6087b545b86277939ce4b9fc9940c9698454
})

export const store = configureStore({
  reducer: {
    rootReducer
  },
<<<<<<< HEAD
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,
  }).concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);

export const dispatchOut =  store.dispatch;
export const state = store.getState();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
=======
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
>>>>>>> 9bad6087b545b86277939ce4b9fc9940c9698454
