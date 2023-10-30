/**
 * Generates an array of weeks and days for a given month and year.
 */
class Month {
    #days = [];

    constructor(month, year) {
        if (!Number.isInteger(month) || month < 0 || month > 11) {
            throw new Error('Invalid month');
        }
        if (!Number.isInteger(year)) {
            throw new Error('Invalid year');
        }

        //set local variables
        this.month = month;
        this.year = year;

        let firstWeek = this.getFirstWeek();

        let nextWeeks = [];

        if (firstWeek.length < 7) {
            nextWeeks = firstWeek;
        } else {
            this.#days.push(firstWeek);
        }

        nextWeeks = this.getOtherWeeks(nextWeeks);
        this.getLastWeeks(nextWeeks);
    }

    /**
     * Returns the array of weeks and days.
     */
    getDays() {
        return this.#days;
    }

    getFirstWeek() {
        //get first day of the month
        let firstDay = new Date(this.year, this.month, 1).getDay();
        //get number of days in previous month
        let prevMonthDays = new Date(this.year, this.month, 0).getDate();

        let firstWeek = [];

        for (let i = 0; i < 7; i++) {
            if (i < firstDay) {
                firstWeek.push([prevMonthDays - firstDay + i + 1, true, false]);
            } else {
                firstWeek.push([i - firstDay + 1, false, this.constructor.isToday(new Date(), i - firstDay + 1, this.month, this.year)]);
            }
        }
        return firstWeek;
    }

    getOtherWeeks(nextWeeks) {
        const currentDate = new Date();

        //get number of days in current month
        let currentMonthDays = new Date(this.year, this.month + 1, 0).getDate();

        let weeks = [];

        for (let i = 1; i <= currentMonthDays; i++) {
            weeks.push([i, false, this.constructor.isToday(currentDate, i, this.month, this.year)]);

            if (weeks.length === 7) {
                this.#days.push(weeks);
                weeks = [];
            }
        }

        return weeks;
    }

    getLastWeeks(nextWeeks) {
        //get number of days in next month
        let nextMonthDays = new Date(this.year, this.month + 2, 0).getDate();
        let i = 1;
        let weeks = [];

        while (this.#days.length < 6) {
            weeks.push([i, true, false]);
            if (this.constructor.isArrayFull(weeks)) {
                this.#days.push(weeks);
                weeks = [];
            }
            i++;
        }
    }

    static isToday(currentDate, i, month, year) {
        if (i === currentDate.getDate()
            && month === currentDate.getMonth()
            && year === currentDate.getFullYear()) {
            return true;
        }
        return false
    }

    static isArrayFull(array) {
        if (array.length === 7) {
            return true;
        }
        return false;
    }
}

export default Month;