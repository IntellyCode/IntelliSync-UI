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
        console.log(firstDay);
        //get number of days in previous month
        let prevMonthDays = new Date(this.year, this.month, 0).getDate();
        console.log(prevMonthDays);
        let firstWeek = [];

        for (let i = 0; i < firstDay; i++) {
            firstWeek.push([prevMonthDays - firstDay + i + 1, true, false]);
        }
        return firstWeek;
    }

    getOtherWeeks(weeks) {
        const currentDate = new Date();

        //get number of days in current month
        let currentMonthDays = new Date(this.year, this.month + 1, 0).getDate();

        for (let i = 1; i <= currentMonthDays; i++) {
            weeks.push([i, false, this.isToday(currentDate, i, this.month, this.year)]);

            if (this.isArrayFull(weeks)) {
                weeks = [];
            }
        }

        return weeks;
    }

    getLastWeeks(weeks) {
        //get number of days in next month
        let nextMonthDays = new Date(this.year, this.month + 2, 0).getDate();
        let i = 1;

        while (this.#days.length < 6) {
            weeks.push([i, true, false]);
            if (this.isArrayFull(weeks)) {
                weeks = [];
            }
            i++;
        }
    }

    isToday(currentDate, i, month, year) {
        if (i === currentDate.getDate()
            && month === currentDate.getMonth()
            && year === currentDate.getFullYear()) {
            return true;
        }
        return false
    }

    isArrayFull(array) {
        if (array.length === 7) {
            this.#days.push(array);
            return true;
        }
        return false;
    }
}

export default Month;