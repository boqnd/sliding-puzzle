'use strict'

import GameBoard from "../game-board/game-board.js"
import * as Timer from "../scripts/timer.js";

window.customElements.define("game-board", GameBoard);

const listenForGame = () => {
    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if ( mutation.type !== "attributes" || mutation.attributeName !== "isready" ) {
                return;
            } 
            if (mutation.target.getAttribute("isready") === "true") {
                Timer.resetTimer();
                Timer.startTimer();
            } else if (mutation.target.getAttribute("isready") === "false") {
                Timer.stopTimer();
            }
        }
    }
    
    const observer = new MutationObserver(mutationCallback);
    
    observer.observe(document.getElementById("playerA"), { attributes: true });
}

listenForGame();