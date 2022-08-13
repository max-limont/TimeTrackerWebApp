import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationType } from "../../../type/Vacation/VacationsTypes";

interface vacationState{
  vacations: VacationType[],
  requestVacations: VacationType[]
}

const initialState:vacationState={
    vacations: [],
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
        updateVacation: (state, action: PayloadAction<VacationType>)=>{
            const i = state.vacations.findIndex(item => item.id == action.payload.id);
            let vacations = state.vacations.slice();
            vacations[i] = action.payload;
            return {...state, vacations: vacations}
        },
        setRequestVacation:  (state, action: PayloadAction<VacationType[]>)=>{
            return {...state, requestVacations: action.payload};
        }
    }
});

export const {removeVacation,addVacation,setVacation,setRequestVacation}=vacationSlice.actions;