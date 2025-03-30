let doi = localStorage.dateOfInterest;
let eoi = localStorage.eventOfInterest;

if(!doi){
    eoi = prompt(`Enter the event: `, `Balfron 10k`);
    doi = prompt(`Enter a date of interest: `, `2025-05-04T11:00:00`);

    localStorage.dateOfInterest = doi;
    localStorage.eventOfInterest = eoi;
}

let eventTitleElement = document.getElementById("timer-title");
eventTitleElement.innerHTML = "<h1>"+ eoi + "</h1>";

setInterval(calculateTimeUntil, 1000, doi);

function calculateTimeUntil(dateOfInterest){
    let difference = new Date(new Date(dateOfInterest) - new Date());
    let daysElement = document.getElementById("days");
    let hoursElement = document.getElementById("hours");
    let minutesElement = document.getElementById("minutes");
    let secondsElement = document.getElementById("seconds");
    
    let daysToGo;
    let hoursToGo;
    let minutesToGo;
    let secondsToGo;
    
    daysToGo = getNumberOfDays(difference.getMonth(), difference.getDate());
    
    if (difference.getHours()>9){
        hoursToGo = difference.getHours().toString();
    }else{
        hoursToGo = "0" + difference.getHours().toString();
    }
    
    if (difference.getMinutes()>9){
        minutesToGo = difference.getMinutes().toString();
    }else{
        minutesToGo = "0" + difference.getMinutes().toString();
    }

    if (difference.getSeconds()>9){
        secondsToGo = difference.getSeconds().toString();
    }else{
        secondsToGo = "0" + difference.getSeconds().toString();
    }

    function getNumberOfDays(currentMonth, dayOfCurrentMonth){
        daysInTheMonth = {
            0: 31,  //Jan
            1: 28,  //Feb
            2: 31,  //.. 
            3: 30,  //..
            4: 31,  //..
            5: 30,  //..
            6: 31,  //..
            7: 31,  //..
            8: 30,  //..
            9: 31,  //..
            10: 30,  //Nov
            11: 31  //Dec
        }
        
        let daysElapsedSoFar = 0;

        if (currentMonth>0){    
            for (month in daysInTheMonth){
                if(month < currentMonth){
                    daysElapsedSoFar += daysInTheMonth[month];
                }
            }
        }

        daysElapsedSoFar += dayOfCurrentMonth-1;

        if (daysElapsedSoFar>9){
            return daysElapsedSoFar.toString();
        } else {
            return "0" + daysElapsedSoFar.toString();
        }
    }

    daysElement.innerHTML = daysToGo + ` <br>days`;
    hoursElement.innerHTML = hoursToGo + ` <br>hours`;
    minutesElement.innerHTML = minutesToGo + ` <br>minutes`;
    secondsElement.innerHTML = secondsToGo + ` <br>seconds`;
}