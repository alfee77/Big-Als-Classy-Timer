let udoi = localStorage.dateOfInterest;
let eoi = localStorage.eventOfInterest;


if(!udoi){    
    /*if retreived udoi is empty, ask the user for an event and date, 
    and then assign these to localStorage variables*/
    eoi = prompt(`Enter the event: `, `Tea Time`);
    udoi = prompt(`Enter a date of interest: `, `2025-04-04T19:00:00+01:00`);

    localStorage.dateOfInterest = udoi;
    localStorage.eventOfInterest = eoi;
}

let eventTitleElement = document.getElementById("timer-title");
let daysElement = document.getElementById("days");
let hoursElement = document.getElementById("hours");
let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");

eventTitleElement.innerHTML = "<h1>"+ eoi + " on " + udoi + "</h1>";

//create a new timer object
let myTimer = new Timer(udoi);

setInterval(()=> {
        myTimer.doTheMath(),
        daysElement.innerHTML = myTimer.absoluteDaysToGo + ` <br>days`;
        hoursElement.innerHTML = myTimer.remainderHoursToGo + ` <br>hours`;
        minutesElement.innerHTML = myTimer.remainderMinutesToGo + ` <br>minutes`;
        secondsElement.innerHTML = myTimer.remainderSecondsToGo + ` <br>seconds`;
    }, 100);

function Timer(dateOfInterest){
    /*The calculateTimeUntil() function takes a single argument, namely
    the dateOfInterest. This is a date object that the user has passed 
    that is... the date of interest!*/
    this.doi = new Date(dateOfInterest).getTime();
    
    const completeDayInms = 24*60*60*1000;
    const completeHourInms = 60*60*1000;
    const completeMinInms = 60*1000;
    const completeSecInms = 1000;

    this.doTheMath = function(){
        let todaysDate = new Date().getTime();
        let difference = new Date(this.doi - todaysDate);
        let differencems = parseInt(difference.getTime().toString());

        this.absoluteDaysToGo = Math.floor(differencems/completeDayInms)
        this.absoluteHoursToGo = Math.floor(differencems/completeHourInms);
        this.absoluteMinutesToGo = Math.floor(differencems/completeMinInms);
        this.absoluteSecondsToGo = Math.floor(differencems/completeSecInms);

        if (this.absoluteDaysToGo > 0){
            this.remainderHoursToGo = this.absoluteHoursToGo % (this.absoluteDaysToGo*24);
        } else {
            this.remainderHoursToGo = this.absoluteHoursToGo;
        }

        if (this.absoluteHoursToGo > 0){
            this.remainderMinutesToGo = this.absoluteMinutesToGo % (this.absoluteHoursToGo*60);
        } else {
            this.remainderMinutesToGo = this.absoluteMinutesToGo;
        }

        if (this.absoluteMinutesToGo > 0){
            this.remainderSecondsToGo = this.absoluteSecondsToGo % (this.absoluteMinutesToGo*60);
        } else {
            this.remainderSecondsToGo = this.absoluteSecondsToGo;
        }
    }
}