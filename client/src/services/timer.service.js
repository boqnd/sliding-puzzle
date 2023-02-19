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
        this.interval = null;
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
        this.interval = setInterval(() => this.start(), 10);
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

    serialize() {
        return (this.hours * 60 * 60 + this.minuets * 60 + this.seconds) * 1000 + this.tens;
    }

    formTwoDigitString(num) {
        return num.toString().padStart(2, '0');
    }

    deserialize(scoreInMilliseconds) {
        let seconds = Math.floor(scoreInMilliseconds / 1000);
        let tens = scoreInMilliseconds - seconds * 1000;
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        return {
            tens: this.formTwoDigitString(tens),
            seconds: this.formTwoDigitString(seconds),
            minutes: this.formTwoDigitString(minutes),
            hours: this.formTwoDigitString(hours),
        }
    }

    get getTens() {
        return this.tens;
    }

    get getSeconds() {
        return this.seconds;
    }

    get getMinuets() {
        return this.minuets;
    }

    get getHours() {
        return this.hours;
    }
}