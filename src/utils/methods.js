export function dateParse(date){

    let year = new Date(date).toLocaleDateString()
    let time = new Date(date).toLocaleTimeString()
    return year+time
}