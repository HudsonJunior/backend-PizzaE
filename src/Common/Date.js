var moment = require('moment');

class Date {
    constructor() {}

    getDate() {
        return this.date;
    }

    getCurrentDate() {
        var d = new Date();
        var date = [d.getCurrentYear(),
                ('0' + (d.getCurrentMonth())).slice(-2),
                ('0' + moment().date()).slice(-2)
                ].join('-');
        return date;
    }

    convertDateToTimezone(data) {
        data.createdAt = this.toTimeZoneSP(data.createdAt);
        data.updatedAt = this.toTimeZoneSP(data.updatedAt);
        return data;
    }

    getCurrentMonth() {
        return moment().month() + 1;
    }

    getCurrentYear() {
        return moment().year();
    }

    getCurrentPastYear() {
        return moment().year() - 1;
    }

    getLastMonths(month, year, pastYear) {
        switch (month) {
            case 1:
                return [
                    year + '-' + '01',
                    pastYear  + '-' + '12',
                    pastYear  + '-' + '11',
                    pastYear  + '-' + '10',
                    pastYear  + '-' + '09',
                    pastYear  + '-' + '08',
                ];
            case 2:
                return [
                    year + '-' + '02', 
                    year + '-' + '01', 
                    pastYear + '-' + '12', 
                    pastYear + '-' + '11', 
                    pastYear + '-' + '10', 
                    pastYear + '-' + '09', 
                ];
            case 3:
                return [
                    year+ '-' + '03' ,
                    year+ '-' + '02' ,
                    year+ '-' + '01' ,
                    pastYear+ '-' + '12' ,
                    pastYear+ '-' + '11' ,
                    pastYear+ '-' + '10' ,
                ];
            case 4:
                return [
                    year + '-' + '04',
                    year + '-' + '03',
                    year + '-' + '02',
                    year + '-' + '01',
                    pastYear + '-' + '12',
                    pastYear + '-' + '11',
                ];
            case 5:
                return [
                    year + '-' + '05' ,
                    year + '-' + '04' ,
                    year + '-' + '03' ,
                    year + '-' + '02' ,
                    year + '-' + '01' ,
                    pastYear + '-' + '12' ,
                ];
            case 6:
                return [
                    year + '-' + '06',
                    year + '-' + '05',
                    year + '-' + '04',
                    year + '-' + '03',
                    year + '-' + '02',
                    year + '-' + '01',
                ];
            case 7:
                return [
                    year + '-' + '07',
                    year + '-' + '06',
                    year + '-' + '05',
                    year + '-' + '04',
                    year + '-' + '03',
                    year + '-' + '02',
                ];
            case 8:
                return [
                    year + '-' + '08',
                    year + '-' + '07',
                    year + '-' + '06',
                    year + '-' + '05',
                    year + '-' + '04',
                    year + '-' + '03',
                ];
            case 9:
                return [
                    year + '-' + '09',
                    year + '-' + '08',
                    year + '-' + '07',
                    year + '-' + '06',
                    year + '-' + '05',
                    year + '-' + '04',
                ];
            case 10:
                return [
                     year + '-' + '10',
                     year + '-' + '09',
                     year + '-' + '08',
                     year + '-' + '07',
                     year + '-' + '06',
                     year + '-' + '05',
                ];
            case 11:
                return [
                    year + '-' + '11',
                    year + '-' + '10',
                    year + '-' + '09',
                    year + '-' + '08',
                    year + '-' + '07',
                    year + '-' + '06',
                ];
            case 12:
                return [
                    year + '-' + '12',
                    year + '-' + '11',
                    year + '-' + '10',
                    year + '-' + '09',
                    year + '-' + '08',
                    year + '-' + '07',
                ];
        }
    }

    converteDate(stringDate) {
        if(stringDate == ""){
            return null
        }else if(moment(stringDate, "YYYY-MM-DD", true).isValid()){
            const newDate = moment(stringDate).toDate();
            return newDate;
        }else{
            return ""
        }
    }
}

module.exports = Date;
