import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationType } from "../../../type/Vacation/VacationsTypes";

interface vacationState{
  vacations: VacationType[],
  requestVacations: VacationType[]
}

const initialState:vacationState={
    vacations: [{
        id: 1,
        userId: 2,
        startingTime: "2022-12-12",
        endingTime: "2022-12-13",
        comment: "pls",
        isAccepted: false
    }],
    requestVacations: []
}

export const vacationSlice = createSlice({
    name: "vacationSlice",
    initialState: initialState,
    reducers:{
        setVacation: (state, action: PayloadAction<VacationType[]>)=>{
            return {...state, vacations: action.payload};
        },
        addVacation: (state, action: PayloadAction<VacationType>)=>{
            return {...state, vacations: state.vacations.concat(action.payload)};
        },
        removeVacation: (state, action: PayloadAction<number>)=>{
            return {...state, vacations: state.vacations.filter(item => item.id !== action.payload)}
        },
    }
});

export const {removeVacation,addVacation,setVacation}=vacationSlice.actions;