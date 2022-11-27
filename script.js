const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const lapButton = document.getElementById("lap-button");
const clearLapsButton = document.getElementById("clear-laps-button");
const display = document.getElementById("display");
const lapsList = document.getElementById("laps-list");

let lapsStorage = JSON.parse(localStorage.getItem("lapsStorage")) || [];
let interval;
let state = "paused";
let startTime = 0;
let endTime = 0;
let timePassed = 0;

// EVENT LISTENERS
startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", split);
clearLapsButton.addEventListener("click", clearLaps)
document.addEventListener("DOMContentLoaded", restoreLastSession);

// FUNCTIONS
function start(){
    if (state === "running") return; // don't do anything if timer is already running
    startTime = Date.now() - timePassed; // starting point. if  timePassed = 0, starting point is 00:00:00:00. if timePassed != 0, starting point is wherever the timer left off.
    interval = setInterval(startClock, 10); // call the startClock function every centisecond
    state = "running"; // set the state to running;
}
function pause(){
    clearInterval(interval); // clear the timer
    state = "paused" // set the state to paused
}
function reset(){
    clearInterval(interval); // clear the time
    state = "paused"; // set the state to paused
    startTime = 0; // reset startTime the counters back to 0
    timePassed = 0; 
    updateDisplay(); // call updateDisplay; bc timePassed is 0, it will reset back to 00:00:00:00
}
function startClock(){
    endTime = Date.now(); // get the time now (in ms). 
    timePassed = endTime - startTime; // calculate how much time has passed since the timer started
    updateDisplay() // update the page
}
function updateDisplay(){
    let remainder = timePassed; // remainder = no. of ms since start time
    let hours = Math.floor(remainder / 3600000); // calculate how many hours can fit into remainder
    remainder = remainder - (hours * 3600000); // how many ms are left; hours are accounted for now so remove them from the total
    let minutes = Math.floor((remainder / 1000) / 60); // calculate how many minutes can fit into remainder
    remainder = remainder - (minutes * 60 * 1000); // calculate how many ms are left now that hours and minutes are accounted for
    let seconds = Math.floor(remainder / 1000); // calculate how many seconds can fit into the remainder
    remainder = remainder - (seconds * 1000) // calculate how many ms are left now that hours, minutes, and seconds are accounted for.
    let centiseconds = Math.floor(remainder / 10) // calculate how many centiseconds there are.
    
    if (hours < 10) hours = "0" + hours; // add a leading 0 before each unit if is smaller than 10
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    if (centiseconds < 10) centiseconds = "0" + centiseconds;
    display.innerText = hours + ":" + minutes + ":" + seconds + ":" + centiseconds; // update the display on the page
}
function split(){
    if (display.innerText === "00:00:00:00") return; // stop user from saving laps when no time has passed
    const lap = document.createElement("li"); // create an li element; attach current display time and append to page;
    lap.classList.add("lap");
    lap.innerText = display.innerText;
    lapsList.prepend(lap); // prepend so the most recent is at the top
    lapsStorage.push(lap.innerHTML); // add lap time to array
    localStorage.setItem("lapsStorage", JSON.stringify(lapsStorage)); // update the array in local storage
}
function clearLaps(){
    const li = document.querySelectorAll("li"); // select all li elements, loop through them and remove
    li.forEach(item => item.remove());
    lapsStorage = []; // empty out all lap times from the array
    localStorage.setItem("lapsStorage", JSON.stringify(lapsStorage)); // replace array in local storage with the empty array
}
function restoreLastSession(){
    lapsStorage.forEach(item => {
        const lap = document.createElement("li");
        lap.classList.add("lap");
        lap.innerText = item;
        lapsList.prepend(lap);
        }) // loop through the array and for each item, which is a lap time, add it back to the page
}
