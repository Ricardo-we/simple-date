import { safeDateParse, firstLetterUpperCase } from "./date.utils";

class SimpleDate {
    constructor(initialDate) {
        this.date =
            initialDate instanceof SimpleDate
                ? safeDateParse(initialDate.b())
                : safeDateParse(initialDate);
        if (isNaN(this.date)) this.date = new Date();
    }

    static getDateDifference(date1, date2) {
        const date1_ = new SimpleDate(date1).build();
        const date2_ = new SimpleDate(date2).build();
        return date1_.getTime() - date2_.getTime();
    }

    setYear(year) {
        this.date.setFullYear(year);
        return this;
    }

    setMonth(month) {
        this.date.setMonth(month);
        return this;
    }

    setHours(hours) {
        this.date.setHours(hours);
        return this;
    }

    setMinutes(minutes) {
        this.date.setMinutes(minutes);
        return this;
    }

    setSeconds(seconds) {
        this.date.setSeconds(seconds);
        return this;
    }

    setMilliseconds(ms) {
        this.date.setMilliseconds(ms);
        return this;
    }

    toZeroTime() {
        return this.setHours(0).setSeconds(0).setMilliseconds(0).setMinutes(0);
    }

    toZeroUtcTime() {
        return this.setUTCHours(0, 0, 0, 0);
    }

    setDayOfMonth(dayOfMonth) {
        this.date.setDate(dayOfMonth);
        return this;
    }

    setUTCHours(utcHours, min, sec, ms) {
        this.date.setUTCHours(utcHours, min, sec, ms);
        return this;
    }

    addDays(days) {
        this.date.setDate(this.dayOfMonth() + days);
        return this;
    }

    addYears(years) {
        this.date.setFullYear(this.year() + years);
        return this;
    }

    addMonths(months) {
        this.date.setMonth(this.date.getMonth() + months);
        return this;
    }

    isoDateStr() {
        return this.date.toISOString();
    }

    isoDateOnlyStr() {
        return this.date.toISOString().split("T")[0];
    }

    utcDateStr() {
        return this.date.toUTCString();
    }
    
    toUtcDate() {
 
        this.date = new Date(this.isoDateOnlyStr() + "T00:00:00");
        return this;
    }

    dayOfMonth() {
        return this.date.getDate();
    }

    dayOfWeek() {
        return this.date.getDay();
    }

    year() {
        return this.date.getFullYear();
    }

    time() {
        return this.date.getTime();
    }

    month() {
        return (this.date.getMonth() ?? 0) + 1;
    }

    localeDateStr(locale, options) {
        return this.date.toLocaleDateString(locale, options);
    }

    localeStr() {
        return this.date.toLocaleString();
    }

    localeTimeStr() {
        return this.date.toLocaleTimeString();
    }

    monthName(locale) {
        return firstLetterUpperCase(
            this.date.toLocaleDateString(locale, { month: "long" })
        );
    }

    build() {
        return this.date;
    }

    b() {
        return this.date;
    }

    static isValidDateString(dateString) {
        const date = new Date(dateString);
        try {
            date.toISOString();
            return true;
        } catch (error) {
            return false;
        }
    }

    static dateFromObject(dateProps = {}) {
        const defaultValues = new Date();

        const date = new Date(
            dateProps?.year ?? defaultValues.getFullYear(),
            dateProps?.monthIndex ?? defaultValues.getMonth(),
            dateProps?.date ?? defaultValues.getDate(),
            dateProps?.hours ?? defaultValues.getHours(),
            dateProps?.minutes ?? defaultValues.getMinutes(),
            dateProps?.seconds ?? defaultValues.getSeconds(),
            dateProps?.ms ?? defaultValues.getMilliseconds()
        );

        return new SimpleDate(date);
    }

    static firstDateOfYear(year = simpleDate().year()) {
        return SimpleDate.dateFromObject({
            year,
        })
            .setDayOfMonth(1)
            .setMonth(0)
            .toZeroTime();
    }

    toFirstDate() {
        return this.setDayOfMonth(1).setMonth(0).toZeroTime();
    }

    hours() {
        return this.date.getHours();
    }

    mins() {
        return this.date.getMinutes();
    }

    ms() {
        return this.date.getMilliseconds();
    }

    getDmyhmsTime() {
        return `${this.dayOfMonth()}${this.month()}${this.year()}_${this.hours()}${this.mins()}${this.ms()}`;
    }

    getUTCMonth(){
        return this.date.getUTCMonth()
    }


    copy() {
        return simpleDate(this);
    }

    static isInvalidDate(date) {
        if (typeof date === "string") {
            const parsedDate = Date.parse(date);
            return isNaN(parsedDate);
        } else {
            return isNaN(simpleDate(date).time());
        }
    }
}

function sDate(date) {
    return new SimpleDate(date);
}

function simpleDateFromObject(dateFromObject) {
    return SimpleDate.dateFromObject(dateFromObject);
}

export { simpleDate, simpleDateFromObject };