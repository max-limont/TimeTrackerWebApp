import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import { graphqlRequest } from "../../graphql/api";
import { fetchTeamsQuery } from "../../graphql/queries/team.queries";
import { fetchTeams, setTeams } from "./team.slice";


const fetchTeamsEpic: Epic = (action$:Observable<ReturnType<typeof fetchTeams>>): any=>{
    return action$.pipe(
        ofType(fetchTeams.type),
        mergeMap(()=>from(graphqlRequest(fetchTeamsQuery)).pipe(
            map((response)=>{
                console.log(response);
                if(response?.data){
                   return setTeams(response.data.teamQuery.fetchTeams);
                }
                throw new Error();
            })
        ))
    )
}

export const teamEpic = combineEpics(fetchTeamsEpic);