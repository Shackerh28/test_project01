const timer = document.getElementById('timebox');
let hr = 0;
let min = 0;
let sec = 0;

//when to display 0's
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//interval
let interval = null;

// status of stopstart

let status = "stopped";

// stop watch function to determine when to increment next value

let 