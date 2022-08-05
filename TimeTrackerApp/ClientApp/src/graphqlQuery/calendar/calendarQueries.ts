const EventFragment=`
id,
date,
typeDayId,
title
`

export const fetchAllEventsQuery = `
  query{
    getEvents{
      ${EventFragment}
    }
  }
`

export const fetchRangeEventQuery = `
 query ($startDate: Date,$finishDate: Date){
    getRangeEvents(startDate: $startDate,finishDate: $finishDate){
      ${EventFragment}
    }
  }
`

export const fetchEventByIdQuery=`query ($id: Int!){
  getEventById(eventId: $id){
    ${EventFragment}
  }
}
`

export const addEventQuery=`
mutation ($event: CalendarInputType){
  addEvent(event: $event){
    ${EventFragment}
  }
}
`