import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationType } from "../../../type/Vacation/VacationsTypes";

interface vacationState{
  vacations: VacationType[],
  requestVacation: VacationType[]
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
    requestVacation: []
}


export const vacationSlice = createSlice({
    name: "vacationSlice",
    initialState: initialState,
    reducers:{
        addVacation: (state, action: PayloadAction<VacationType>)=>{
        },
        removeVacation: (state, action: PayloadAction<VacationType>)=>{
        }
    }
});