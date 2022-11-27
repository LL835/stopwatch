const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const lapButton = document.getElementById("lap-button");
const display = document.getElementById("display");
const lapsList = document.getElementById("laps-list");
const lapsStorage = JSON.parse(localStorage.getItem("lapsStorage")) || [];

let stopwatchTimer;
let state = "paused";
let cs = 0;
let secs = 0;
let mins = 0;
let hrs = 0;


// EVENT LISTENERS
startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset)
lapButton.addEventListener("click", split)
document.addEventListener("DOMContentLoaded", restoreLastSession)

// FUNCTIONS
function start(){
    // if the timer is already running, do nothing
    if (state === "running") return;
    // if the timer is not running, create a timer that calls startCounting on repeat.
    stopwatchTimer = setInterval(startCounting, 10);
    // set state to running
    state = "running";
}
function pause(){
    // clear the timer
    clearInterval(stopwatchTimer);
    state = "paused";
}
function reset(){
    // clear the timer
    clearInterval(stopwatchTimer);
    state = "paused";
    // reset all counters back to 0;
    cs = 0;
    secs = 0;
    mins = 0;
    hrs = 0;
    // set the display back to 0
    display.innerText = "00:00:00:00"
}
function startCounting(){
    // increment cs by 1
    cs++;
    // if cs = 100, 1 sec has passed so cs is back to 0 and increment secs by 1
    if (cs === 100) {
        cs = 0;
        secs++;
    };
    // if secs = 60, 1 min has passed so secs is back to 0 and increment mins by 1
    if (secs === 60){
        secs = 0;
        mins++
    }
    // if mins = 60, 1 hour has passed so mins is back to 0 and increment hrs by 1
    if (mins === 60){
        mins = 0;
        hrs++
    }
    // update the page so user can see the timer
    updateDisplay()
}
function updateDisplay(){
    // if cs, secs, mins, or hrs, is < 10, add a 0 before
    let csFormatted = cs;
    let secsFormatted = secs;
    let minsFormatted = mins;
    let hrsFormatted = hrs;

    if (cs < 10) csFormatted = "0" + cs;
    if (secs < 10) secsFormatted = "0" + secs;
    if (mins < 10) minsFormatted = "0" + mins;
    if (hrs < 10) hrsFormatted = "0" + hrs;

    // update the page with the formated nums
    display.innerText = hrsFormatted + ":" + minsFormatted + ":" + secsFormatted + ":" + csFormatted;
}
function split(){
    const lap = document.createElement("li");
    lap.classList.add("lap")
    lap.innerText = display.innerText;
    lapsList.prepend(lap)

    lapsStorage.push(lap.innerHTML);
    localStorage.setItem("lapsStorage", JSON.stringify(lapsStorage))
}
function restoreLastSession(){
    lapsStorage.forEach(item => {
        const lap = document.createElement("li");
        lap.classList.add("lap")
        lap.innerText = item;
        lapsList.prepend(lap)
        })
}
