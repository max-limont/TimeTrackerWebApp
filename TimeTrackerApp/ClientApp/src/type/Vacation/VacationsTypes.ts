export type  VacationType ={
    id:number,
    userId: number,
    startingTime:string,
    endingTime: string,
    comment: string,
    isAccepted: boolean|null
}; 

export type CreateVacationType={
    userId: number,
    StartingTime:string,
    EndingTime: string,
    Comment: string
}