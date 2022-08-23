

export const fetchTeamsQuery=`
query{
    teamQuery{
        fetchTeams{
            id,
            nameTeam
        }
    }
}`;