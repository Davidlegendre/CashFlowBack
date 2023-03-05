export function addMilisecondsToDate(intMilisconds) {
    return new Date(new Date().getTime() + intMilisconds);;
}

export function getDateNow(){
    return new Date()
}