import { createAction } from "@reduxjs/toolkit";
import { CreateVacationType, VacationType } from "../../../type/Vacation/VacationsTypes";

export const getAllVacationsTypeTypeAction="getAllVacations";
export const getVacationsByUserIdTypeAction="getVacationsByUserId";
export const getVacationByIdTypeAction="getVacationById";
export const createVacationTypeAction="createVacation";
export const getRequestVacationTypeAction="getRequestVacation";
export const removeVacationTypeAction ="removeVacation";
export const updateVacationTypeAction="updateVacation";

export const getRequestVacationAction=createAction<number>(getRequestVacationTypeAction);
export const getAllVacationsAction= createAction(getAllVacationsTypeTypeAction);
export const getVacationsByUserIdAction =createAction<number>(getVacationsByUserIdTypeAction);
export const getVacationByIdAction = createAction<number>(getVacationByIdTypeAction);
export const createVacationAction = createAction<CreateVacationType>(createVacationTypeAction);
export const removeVacationAction = createAction<number>(removeVacationTypeAction);
export const updateVacationAction = createAction<VacationType>(updateVacationTypeAction);
