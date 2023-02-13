import './style.css'

const templateString = `
    <style>
        @import "main.css";
    </style>
<main class="form-wrapper">
        <div class="modal active">
            <h1 class="form-title">Sliding Puzzle Game</h1>
            <p class="action">Sign in</p>
            <form class="sign-in" id="form-self" action="#">
                <div class="input">
                    <input type="email" class="input-field" name="email" placeholder=" " required/>
                    <label class="input-label" for="Email">Email</label>
                </div>
                <div class="input">
                    <input type="password" class="input-field" name="password" placeholder=" " required />
                    <label class="input-label">Password</label>
                </div>
                <div class="button-wrapper">
                    <button class="form-submit">Sign in</button>
                </div>
                <p class="error"></p>
            </form>
            <div>No account? <a class="switch">Sign up</a></div>
        </div>
        <div class="modal">
            <h1 class="form-title">Sliding Puzzle Game</h1>
            <p class="action">Sign up</p>
            <form class="sign-up" id="form-self" action="#">
                <div class="input">
                    <input type="email" class="input-field" name="email" placeholder=" " required />
                    <label class="input-label" for="Email">Email</label>
                </div>
                <div class="input">
                    <input type="password" class="input-field" name="password" placeholder=" " required />
                    <label class="input-label">Password</label>
                </div>
                <div class="input">
                    <input type="password" class="input-field" name="password" placeholder=" " required />
                    <label class="input-label">Repeat password</label>
                </div>
                <div class="button-wrapper">
                    <button class="form-submit">Sign up</button>
                </div>
                <p class="error"></p>
            </form>
            <div>Got an account? <a class="switch">Sign in</a></div>
        </div>
    </main>`

class LoginComponent extends HTMLElement {
    #_shadowRoot = null;

    constructor() {
        super();
        this.#_shadowRoot = this.attachShadow({mode: 'open'});
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this.#_shadowRoot.appendChild(template.content.cloneNode(true));
    }

}

customElements.define("app-login", LoginComponent);