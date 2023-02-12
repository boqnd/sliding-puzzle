'use strict'

export class Timer {
    tensEl;
    secondsEl;
    minuetsEl;
    hoursEl;

    constructor(
        tensEl,
        secondsEl,
        minuetsEl,
        hoursEl
    ) {
        this.tens = 0;
        this.seconds = 0;
        this.minuets = 0;
        this.hours = 0;
        this.tensEl = tensEl;
        this.secondsEl = secondsEl;
        this.minuetsEl = minuetsEl;
        this.hoursEl = hoursEl;
    }

    start() {
        this.tens++;

        if(this.tens < 9) {
            this.tensEl.innerHTML = "0" + this.tens;
        }
        if(this.tens > 9) {
            this.tensEl.innerHTML = this.tens;
        }
        if(this.tens > 99) {
            this.seconds++;
            this.secondsEl.innerHTML = "0" + this.seconds;
            this.tens = 0;
            this.tensEl.innerHTML = "00";
        }
        if(this.seconds > 9) {
            this.secondsEl.innerHTML = this.seconds;
        }
        if(this.seconds > 59) {
            this.minuets++;
            this.minuetsEl.innerHTML = "0" + this.minuets;
            this.seconds = 0;
            this.secondsEl.innerHTML = "00";
        }
        if(this.minuets > 9) {
            this.minuetsEl.innerHTML = this.minuets;
        }
        if(this.minuets > 59) {
            this.hours++;
            this.hoursEl.innerHTML = "0" + this.hours;
            this.minuets = 0;
            this.minuetsEl.innerHTML = "00";
        }
    }

    startTimer() {
        this.interval = setInterval(this.start.bind(this), 10);
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    resetTimer() {
        clearInterval(this.interval);
        this.tens = 0;
        this.seconds = 0;
        this.minuets = 0;
        this.hours = 0;
        this.tensEl.innerHTML = "00";
        this.secondsEl.innerHTML = "00";
        this.minuetsEl.innerHTML = "00";
        this.hoursEl.innerHTML = "00";
    }
}
// //Initial elements

// let interval;
// export let tens = 0;
// export let seconds = 0;
// export let minuets = 0;
// export let hours = 0;

// //Function that starts the timer, used in the setInterval when the came is started
// const start = () => {
//     tens++;

//     if(tens < 9) {
//         tensEl.innerHTML = "0" + tens;
//     }
//     if(tens > 9) {
//         tensEl.innerHTML = tens;
//     }
//     if(tens > 99) {
//         seconds++;
//         secondsEl.innerHTML = "0" + seconds;
//         tens = 0;
//         tensEl.innerHTML = "00";
//     }
//     if(seconds > 9) {
//         secondsEl.innerHTML = seconds;
//     }
//     if(seconds > 59) {
//         minuets++;
//         minuetsEl.innerHTML = "0" + minuets;
//         seconds = 0;
//         secondsEl.innerHTML = "00";
//     }
//     if(minuets > 9) {
//         minuetsEl.innerHTML = minuets;
//     }
//     if(minuets > 59) {
//         hours++;
//         hoursEl.innerHTML = "0" + hours;
//         minuets = 0;
//         minuetsEl.innerHTML = "00";
//     }
// }

// //Starting the timer
// export const startTimer = () => {
//     interval = setInterval(start, 10);
// }

// //Pausing the timer
// export const stopTimer = () => {
//     clearInterval(interval);
// }

// //Resetting the timer
// export const resetTimer = () => {
//     clearInterval(interval);
//     tens = 0;
//     seconds = 0;
//     minuets = 0;
//     hours = 0;
//     tensEl.innerHTML = "00";
//     secondsEl.innerHTML = "00";
//     minuetsEl.innerHTML = "00";
//     hoursEl.innerHTML = "00";
// }