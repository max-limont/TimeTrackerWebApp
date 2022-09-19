import {configureStore, combineReducers, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authorizeUser, authSlice} from './auth/auth.slice';
import {timeTrackerSlice} from "./timeTracker/timeTracker.slice";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {calendarSlice} from './calendar/calendar.slice';
import {authEpics} from './auth/auth.epics';
import {userEpics} from './user/user.epics';
import {userListSlice} from './userList/userList.slice';
import {calendarEpics} from './calendar/calendar.epics';
import {userListEpics} from "./userList/userList.epics";
import {timeTrackerEpics} from "./timeTracker/timeTracker.epics";
import {vacationSlice} from './vacation/vacation.slice';
import {vacationEpic} from './vacation/vacation.epics';
import {sickLeaveSlice} from "./sickLeave/sickLeave.slice";
import {sickLeaveEpics} from "./sickLeave/sickLeave.epics";
import {userSlice} from "./user/user.slice";
import * as SignalR from "@aspnet/signalr";
import {HubConnectionBuilder} from "@aspnet/signalr";
import {AuthUserType, User} from "../types/user.types";
import {developmentApiUrl, productionApiUrl} from "../graphql/api";
import {AuthorizationUser} from "../types/auth.types";
import {SignalData} from '../types/app.types';
import { signalRSlice } from './signalr';

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(authEpics, userEpics, calendarEpics, timeTrackerEpics, vacationEpic, userListEpics, sickLeaveEpics);

const rootReducer = combineReducers({
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
    userList: userListSlice.reducer,
    timeTracker: timeTrackerSlice.reducer,
    vacation: vacationSlice.reducer,
    sickLeave: sickLeaveSlice.reducer,
    user: userSlice.reducer,
    signal: signalRSlice.reducer
});

export const store = configureStore({
    reducer: {
        rootReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(epicMiddleware)
});


// @ts-ignore
epicMiddleware.run(rootEpic);

export const state = store.getState();



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;