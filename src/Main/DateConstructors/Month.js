/**
    * 
    * @param {Integer from 0 to 11} month 
    * @param {Integer} year 
    */
class Month {
  days = [];

  constructor(month, year) {
    this.month = month;
    this.year = year;
    const currentDate = new Date();
    let firstDay = new Date(year, month, 1).getDay();
    let prevMonthDays = new Date(year, month, 0).getDate();
    let firstWeek = [];
    for (let i = 0; i < firstDay; i++) {
      firstWeek.push([prevMonthDays - firstDay + i + 1, true, false]);
    }
    let nextWeeks = [];
    if (firstWeek.length > 0) {
      firstWeek.length % 7 == 0 ? this.days.push(firstWeek) : (nextWeeks = firstWeek);
    }
    let currentMonthDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= currentMonthDays; i++) {
      let today = false;
      if (i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
        today = true;
      }
      nextWeeks.push([i, false, today]);
      if (nextWeeks.length === 7) {
        this.days.push(nextWeeks);
        nextWeeks = [];
      }
    }
    let nextMonthDays = new Date(year, month + 2, 0).getDate();
    let i = 1;
    while (this.days.length < 6) {
      nextWeeks.push([i, true, false]);
      if (nextWeeks.length === 7) {
        this.days.push(nextWeeks);
        nextWeeks = [];
      }
      i++;
    }
  }

  getDays() {
    return this.days;
  }
}
  
  export default Month;