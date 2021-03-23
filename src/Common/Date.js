var moment = require('moment');

<<<<<<< HEAD
class Date {
    constructor() {
        this.date = moment().tz('America/Sao_Paulo');
    }

    toTimeZoneSP(date) {
        var format = 'DD/MM/YYYY HH:mm:ss ZZ';
        return moment(date, format).tz('America/Sao_Paulo').format(format);
    }
=======
class Date{
    constructor(){   }
>>>>>>> Edson-Cizesk

    getDate() {
        return this.date;
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
                    '01' + '/' + year,
                    '12' + '/' + pastYear,
                    '11' + '/' + pastYear,
                    '10' + '/' + pastYear,
                    '09' + '/' + pastYear,
                    '08' + '/' + pastYear,
                ];
            case 2:
                return [
                    '02' + '/' + year,
                    '01' + '/' + year,
                    '12' + '/' + pastYear,
                    '11' + '/' + pastYear,
                    '10' + '/' + pastYear,
                    '09' + '/' + pastYear,
                ];
            case 3:
                return [
                    '03' + '/' + year,
                    '02' + '/' + year,
                    '01' + '/' + year,
                    '12' + '/' + pastYear,
                    '11' + '/' + pastYear,
                    '10' + '/' + pastYear,
                ];
            case 4:
                return [
                    '04' + '/' + year,
                    '03' + '/' + year,
                    '02' + '/' + year,
                    '01' + '/' + year,
                    '12' + '/' + pastYear,
                    '11' + '/' + pastYear,
                ];
            case 5:
                return [
                    '05' + '/' + year,
                    '04' + '/' + year,
                    '03' + '/' + year,
                    '02' + '/' + year,
                    '01' + '/' + year,
                    '12' + '/' + pastYear,
                ];
            case 6:
                return [
                    '06' + '/' + year,
                    '05' + '/' + year,
                    '04' + '/' + year,
                    '03' + '/' + year,
                    '02' + '/' + year,
                    '01' + '/' + year,
                ];
            case 7:
                return [
                    '07' + '/' + year,
                    '06' + '/' + year,
                    '05' + '/' + year,
                    '04' + '/' + year,
                    '03' + '/' + year,
                    '02' + '/' + year,
                ];
            case 8:
                return [
                    '08' + '/' + year,
                    '07' + '/' + year,
                    '06' + '/' + year,
                    '05' + '/' + year,
                    '04' + '/' + year,
                    '03' + '/' + year,
                ];
            case 9:
                return [
                    '09' + '/' + year,
                    '08' + '/' + year,
                    '07' + '/' + year,
                    '06' + '/' + year,
                    '05' + '/' + year,
                    '04' + '/' + year,
                ];
            case 10:
                return [
                    '10' + '/' + year,
                    '09' + '/' + year,
                    '08' + '/' + year,
                    '07' + '/' + year,
                    '06' + '/' + year,
                    '05' + '/' + year,
                ];
            case 11:
                return [
                    '11' + '/' + year,
                    '10' + '/' + year,
                    '09' + '/' + year,
                    '08' + '/' + year,
                    '07' + '/' + year,
                    '06' + '/' + year,
                ];
            case 12:
                return [
                    '12' + '/' + year,
                    '11' + '/' + year,
                    '10' + '/' + year,
                    '09' + '/' + year,
                    '08' + '/' + year,
                    '07' + '/' + year,
                ];
        }
    }

    isValidDate(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

        // Parse the date parts to integers
        var parts = dateString.split('/');
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    converteDate(stringDate){
        const newDate = moment(stringDate).toDate()
        return newDate
    }
}

module.exports = Date;
