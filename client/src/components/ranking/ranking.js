
import './style.css'

const templateString = `
    <style>
        @import "main.css";
    </style>
<div class="heading">
        <div class="signout-btn-wrapper">
            <button class="btn sign-out-btn">Sign out</button> 
            <span id="username"></span>
        </div>
        <button class="btn back-to-game">Back to game</button>
    </div>

    <main class="ranking-wrapper">
        <div class="wrapper x3">
            <h1>BEST SCORE 3X3</h1>
            <hr>
            <ul class="ranking rank3x3">
                <li class="user-score-li labels"><p>Username:</p><p>Time:</p></li>
            </ul>
        </div>
        <div class="wrapper x4">
            <h1>BEST SCORE 4X4</h1>
            <hr>
            <ul class="ranking rank4x4">
                <li class="user-score-li labels"><p>Username:</p><p>Time:</p></li>
            </ul>
        </div>
        <div class="wrapper x5">
            <h1>BEST SCORE 5X5</h1>
            <hr>
            <ul class="ranking rank5x5">
                <li class="user-score-li labels"><p>Username:</p><p>Time:</p></li>
            </ul>
        </div>
    </main>
    `;

class RankingComponent extends HTMLElement {
    #_shadowRoot = null;

    constructor() {
        super();
        this.#_shadowRoot = this.attachShadow({mode: 'open'});
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this.#_shadowRoot.appendChild(template.content);
    }
    
}

customElements.define("ranking-component", RankingComponent);