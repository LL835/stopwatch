const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const lapButton = document.getElementById("lap-button");
timer = document.getElementById("timer")

let cs = 0;
let secs = 0;
let mins = 0;
let hrs = 0;


// EVENT LISTENERS
startButton.addEventListener("click", () => {
    setInterval(startTimer, 10);
})
pauseButton.addEventListener("click", () => {
    // run code to pause timer
})
resetButton.addEventListener("click", () => {
    // run code to reset timer
})
lapButton.addEventListener("click", () => {
    // run code to record a lap
})

// FUNCTIONS
function startTimer(){
    cs++;
    if (cs === 100) {
        cs = 0;
        secs++;
    };
    if (secs === 60){
        secs = 0;
        mins++
    }
    if (mins === 60){
        mins = 0;
        hrs++
    }
    updateDisplay()
}
function updateDisplay(){
    let csFormatted = cs;
    let secsFormatted = secs;
    let minsFormatted = mins;
    let hrsFormatted = hrs;

    if (cs < 10) csFormatted = "0" + cs;
    if (secs < 10) secsFormatted = "0" + secs;
    if (mins < 10) minsFormatted = "0" + mins;
    if (hrs < 10) hrsFormatted = "0" + hrs;

    timer.innerText = hrsFormatted + ":" + minsFormatted + ":" + secsFormatted + ":" + csFormatted;
    
}