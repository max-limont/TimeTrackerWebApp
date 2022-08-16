import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationLevelType } from "../../../type/Vacation/VacationsTypes";

interface vacationLevelState {
    vacationLevels: VacationLevelType[]
}

const inititalState :vacationLevelState={
    vacationLevels: []
}

export const vacationLevelSlice = createSlice({
    name: "vacationLevel",
    initialState: inititalState,
    reducers: {
        setVacationLevels:(state,action:PayloadAction<VacationLevelType[]>)=>{
            return {...state, vacationLevels: action.payload};
        },
        removeVacationLevel: (state, action: PayloadAction<number>)=>{
            return {...state, vacationLevels: state.vacationLevels.filter((item)=>!(item.id == action.payload))};
        },
        addVacationLevel: (state, action: PayloadAction<VacationLevelType>)=>{
            return {...state, vacationLevels: state.vacationLevels.concat(action.payload)};
        }
    }
});


export const {setVacationLevels, removeVacationLevel, addVacationLevel}=vacationLevelSlice.actions;