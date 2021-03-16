var moment = require("moment-timezone");

class Date {
    constructor() {
        this.date = moment().tz("America/Sao_Paulo");
    }

    toTimeZoneSP(date) {
        var format = "DD/MM/YYYY HH:mm:ss ZZ";
        return moment(date, format).tz("America/Sao_Paulo").format(format);
    }

    getDate() {
        return this.date;
    }

    convertDateToTimezone(data) {
        data.createdAt = this.toTimeZoneSP(data.createdAt);
        data.updatedAt = this.toTimeZoneSP(data.updatedAt);

        return data;
    }

    isValidDate(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
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
}

module.exports = Date;
