var moment = require('moment-timezone');

class Date{
    constructor(){
        this.date = moment().tz('America/Sao_Paulo')
    }

    toTimeZoneSP(date){
        var format = 'DD/MM/YYYY HH:mm:ss ZZ';
        return moment(date, format).tz('America/Sao_Paulo').format(format);
    }

    getDate(){
        return this.date
    }

    convertDateToTimezone(data){
        data.createdAt = this.toTimeZoneSP(data.createdAt)
        data.updatedAt = this.toTimeZoneSP(data.updatedAt)

        return data
    }
}

module.exports = Date
