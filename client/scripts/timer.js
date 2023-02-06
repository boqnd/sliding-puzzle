'use strict'
//Initial elements
const tensEl = document.getElementById("tens");
const secondsEl = document.getElementById("seconds");
const minuetsEl = document.getElementById("minuets");
const hoursEl = document.getElementById("hours");
let interval;
export let tens = 0;
export let seconds = 0;
export let minuets = 0;
export let hours = 0;

//Function that starts the timer, used in the setInterval when the came is started
const start = () => {
    tens++;

    if(tens < 9) {
        tensEl.innerHTML = "0" + tens;
    }
    if(tens > 9) {
        tensEl.innerHTML = tens;
    }
    if(tens > 99) {
        seconds++;
        secondsEl.innerHTML = "0" + seconds;
        tens = 0;
        tensEl.innerHTML = "00";
    }
    if(seconds > 9) {
        secondsEl.innerHTML = seconds;
    }
    if(seconds > 59) {
        minuets++;
        minuetsEl.innerHTML = "0" + minuets;
        seconds = 0;
        secondsEl.innerHTML = "00";
    }
    if(minuets > 9) {
        minuetsEl.innerHTML = minuets;
    }
    if(minuets > 59) {
        hours++;
        hoursEl.innerHTML = "0" + hours;
        minuets = 0;
        minuetsEl.innerHTML = "00";
    }
}

//Starting the timer
export const startTimer = () => {
    interval = setInterval(start, 10);
}

//Pausing the timer
export const stopTimer = () => {
    clearInterval(interval);
}

//Resetting the timer
export const resetTimer = () => {
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    minuets = 0;
    hours = 0;
    tensEl.innerHTML = "00";
    secondsEl.innerHTML = "00";
    minuetsEl.innerHTML = "00";
    hoursEl.innerHTML = "00";
}