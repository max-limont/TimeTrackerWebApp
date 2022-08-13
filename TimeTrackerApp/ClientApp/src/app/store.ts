import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { authSlice } from '../store/slice/authentication/authSlice';
import { timeTrackerReducer } from "../store/slice/timeTracker/timeTrackerSlice";
import { combineEpics, createEpicMiddleware} from "redux-observable";
import { calendarSlice } from '../store/slice/calendar/calendarSlice';
import { authEpics } from './api/epics/auth/authEpics';
import { userEpics } from './api/epics/user/userEpics';
import userListSlice from '../store/slice/user/userListSlice';
import { calendarEpics } from './api/epics/calendar/calendarEpics';
import {timeTrackerEpics} from "./api/epics/timeTracker/timeTrackerEpics";
import { vacationSlice } from '../store/slice/vacation/vacationSlice';
import { vacationEpic } from './api/epics/vacation/vacationEpics';
import { vacationLevelSlice } from '../store/slice/vacationLevel/vacationLevelSlice';
import { vacationLevelEpic } from './api/epics/vacationLevel/vacationLevelEpics';


const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(authEpics,userEpics,calendarEpics, timeTrackerEpics,vacationEpic,vacationLevelEpic);


const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
  auth: authSlice.reducer,
  userList: userListSlice.reducer,
  timeTracker: timeTrackerReducer,
  vacation: vacationSlice.reducer,
  vacationLevel: vacationLevelSlice.reducer
})

export const store = configureStore({
  reducer: {
    rootReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);

export const dispatchOut = store.dispatch;
export const state = store.getState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;