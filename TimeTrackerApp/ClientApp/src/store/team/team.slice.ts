import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamType } from "../../types/team.types";


type teamState = {
    teams: TeamType[]
}

const initialState: teamState={
    teams: []
}

export const teamSlice = createSlice({
name: "teamSlice",
initialState: initialState,
reducers: {
    setTeams: (state, action: PayloadAction<TeamType[]>) => {
        return {...state, teams: action.payload}
    }
}
});

export const {setTeams} = teamSlice.actions;

export const fetchTeams = createAction("fetchTeams");
