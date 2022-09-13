export type SignalData = {
    type:string,
    issuerMessage: number,
    data: DataClaim[]
}
 
type DataClaim = {
 type: string,
 value: string
}