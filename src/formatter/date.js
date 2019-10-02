export function getDate(dateObject){
    return dateObject.getFullYear() + "-" + ((dateObject.getMonth()+1)+"").padStart(2, "0") + "-" + ((dateObject.getDate())+"").padStart(2, "0")
}

export function getTime(dateObject){
    return (dateObject.getHours()+"").padStart(2, "0") + ":" + ((dateObject).getMinutes()+"").padStart(2, "0");
}