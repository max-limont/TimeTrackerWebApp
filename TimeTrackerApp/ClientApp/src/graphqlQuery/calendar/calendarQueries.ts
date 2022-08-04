export const fetchAllEventsQuery = `
  query{
    getEvents{
      id,
      date,
      typeDayId,
      title
    }
  }
`

export const fetchRangeEventQuery = `
 query ($startDate: Date,$finishDate: Date){
    getRangeEvents(startDate: $startDate,finishDate: $finishDate){
       id,
      date,
      typeDayId,
      title
    }
  }
`