var moment = require('moment');

class Date{
    constructor(){   }

    getDate(){
        return this.date
    }

    convertDateToTimezone(data){
        data.createdAt = this.toTimeZoneSP(data.createdAt)
        data.updatedAt = this.toTimeZoneSP(data.updatedAt)

        return data
    }

    converteDate(stringDate){
        const newDate = moment(stringDate).toDate()
        return newDate
    }
}

module.exports = Date
