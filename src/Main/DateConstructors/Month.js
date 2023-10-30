/**
    * 
    * @param {Integer from 0 to 11} month 
    * @param {Integer} year 
    */
class Month {
    days = [];

    constructor(month, year) {

        //set local variables
        this.month = month;
        this.year = year;

        let firstWeek = this.getFirstWeek();

        let nextWeeks = [];

        if (firstWeek.length > 0 && firstWeek.length % 7 == 0) {
            this.days.push(firstWeek)
        } else {
            nextWeeks = firstWeek;
        }

        this.getOtherWeeks(nextWeeks);
        this.getLastWeeks(nextWeeks);
    }

    getDays() {
        return this.days;
    }

    getFirstWeek() {
        //get first day of the month
        let firstDay = new Date(this.year, this.month, 1).getDay();
        //get number of days in previous month
        let prevMonthDays = new Date(this.year, this.month, 0).getDate();

        let firstWeek = [];

        for (let i = 0; i < firstDay; i++) {
            firstWeek.push([prevMonthDays - firstDay + i + 1, true, false]);
        }
        return firstWeek;
    }
    
    getOtherWeeks(nextWeeks) {

        const currentDate = new Date();

        //get number of days in current month
        let currentMonthDays = new Date(this.year, this.month + 1, 0).getDate();

        for (let i = 1; i <= currentMonthDays; i++) {
            nextWeeks.push([i, false, this.isToday(currentDate, i, this.month, this.year)]);

            if (nextWeeks.length === 7) {
                this.days.push(nextWeeks);
                nextWeeks = [];
            }

        }
    }

    getLastWeeks(nextWeeks) {
        //get number of days in next month
        let nextMonthDays = new Date(this.year, this.month + 2, 0).getDate();
        let i = 1;
        while (this.days.length < 6) {
            nextWeeks.push([i, true, false]);
            if (this.isArrayFull(nextWeeks)) {
                nextWeeks = [];
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
            this.days.push(array);
            return true;
        }
        return false;
    }
}

export default Month;