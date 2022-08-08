import {useContext} from "react";
import {authContext} from "../components/Auth/AuthProvider";

export const useAuth = () => useContext(authContext)