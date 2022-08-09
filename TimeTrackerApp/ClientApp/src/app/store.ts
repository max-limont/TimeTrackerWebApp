import { configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit';
import { authSlice } from '../store/slice/authentication/authSlice';
import { combineEpics, createEpicMiddleware, ofType } from "redux-observable";
import calendarSlice from '../store/slice/calendar/calendarSlice';
import { authEpics } from './api/epics/auth/authEpics';
import { Cookies } from 'react-cookie';
import { userEpics } from './api/epics/user/userEpics';
import userListSlice from '../store/slice/user/userListSlice';
import {userListEpics} from "./api/epics/userList/userListEpic";



const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(authEpics,userEpics, userListEpics);


const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
  auth: authSlice.reducer,
  userList: userListSlice.reducer
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

export const dispatchOut =  store.dispatch;
export const state = store.getState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;