const EventFragment=`
id,
date,
typeDayId,
title,
endDate
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

export const editEventQuery= `
mutation($event: CalendarUpdateType){
  updateEvent(event: $event){
    ${EventFragment}
  }
}
`
export const deleteEventQuery=`
mutation ($id:ID!){
  deleteEvent(id: $id){
    ${EventFragment}
  }
}
`