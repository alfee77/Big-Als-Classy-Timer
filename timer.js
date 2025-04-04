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

let daysElement = document.getElementById("days");
let hoursElement = document.getElementById("hours");
let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");
    
let eventTitleElement = document.getElementById("timer-title");
eventTitleElement.innerHTML = "<h1>"+ eoi + " on " + udoi + "</h1>";

/* call the calcualateTimeUntil() function as a call back function 
from within a setInterval() function call, passing to it the udoi.*/
setInterval(calculateTimeUntil, 1000, udoi);

function calculateTimeUntil(dateOfInterest){
    /*The calculateTimeUntil() function takes a single argument, namely
    the dateOfInterest. This is a date object that the user has passed 
    that is... the date of interest! The function subtracts todays date 
    from the udoi, and then proceeds to split out days, hours, minutes 
    and time*/
    
    let doi = new Date(dateOfInterest).getTime();
    let todaysDate = new Date().getTime();

    let difference = new Date(doi - todaysDate);
    let differencems = parseInt(difference.getTime().toString())
    
    const completeDayInms = 24*60*60*1000;
    const completeHourInms = 60*60*1000;
    const completeMinInms = 60*1000;
    const completeSecInms = 1000;

    let absoluteDaysToGo;
    let absoluteHoursToGo;
    let absoluteMinutesToGo;
    let absoluteSecondsToGo;

    
    absoluteDaysToGo = Math.floor(differencems/completeDayInms)
    absoluteHoursToGo = Math.floor(differencems/completeHourInms);
    absoluteMinutesToGo = Math.floor(differencems/completeMinInms);
    absoluteSecondsToGo = Math.floor(differencems/completeSecInms);

    if (absoluteDaysToGo > 0){
        remainderHoursToGo = absoluteHoursToGo % (absoluteDaysToGo*24);
    } else {
        remainderHoursToGo = absoluteHoursToGo;
    }

    if (absoluteHoursToGo > 0){
        remainderMinutesToGo = absoluteMinutesToGo % (absoluteHoursToGo*60);
    } else {
        remainderMinutesToGo = absoluteMinutesToGo;
    }

    if (absoluteMinutesToGo > 0){
        remainderSecondsToGo = absoluteSecondsToGo % (absoluteMinutesToGo*60);
    } else {
        remainderSecondsToGo = absoluteSecondsToGo;
    }
    
    
    // Display the timer on the screen
    daysElement.innerHTML = absoluteDaysToGo + ` <br>days`;
    hoursElement.innerHTML = remainderHoursToGo + ` <br>hours`;
    minutesElement.innerHTML = remainderMinutesToGo + ` <br>minutes`;
    secondsElement.innerHTML = remainderSecondsToGo + ` <br>seconds`;
}