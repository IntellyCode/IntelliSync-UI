import Month from './Month.js';

class Year{
    constructor(year){
        this.year = year;
        this.months = [];
        for(let i = 0; i < 12; i++){
            this.months.push(new Month(i, year));
        }
    }
    getMonths(){
        return this.months;
    }
}
export default Year;