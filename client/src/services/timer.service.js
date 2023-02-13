'use strict'

export class Timer {
    tensEl;
    secondsEl;
    minuetsEl;
    hoursEl;
    interval;

    constructor(
        tensEl,
        secondsEl,
        minuetsEl,
        hoursEl
    ) {
        this.isRunning = false;
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
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(this.start.bind(this), 10);
        }
    }

    stopTimer() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.isRunning = false;
        }
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