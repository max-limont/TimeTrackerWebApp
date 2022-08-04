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