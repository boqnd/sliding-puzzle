import { authService } from '../../services/auth.service.js';
import './style.css'



export default class LoginComponent extends HTMLElement {
    #_shadowRoot = null;

    constructor() {
        super();

        const templateString = `
    <style>
        @import "../main.css";
    </style>
<main class="form-wrapper">
        <div class="modal active">
            <h1 class="form-title">Sliding Puzzle Game</h1>
            <p class="action">Sign in</p>
            <form class="sign-in" id="form-self" action="#">
                <div class="input">
                    <input type="text" class="input-field" name="username" placeholder=" " required/>
                    <label class="input-label" for="Email">Username</label>
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

        this.#_shadowRoot = this.attachShadow({mode: 'open'});
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this.#_shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const form = this.#_shadowRoot.querySelector('.sign-in');
        const switchBtn = this.#_shadowRoot.querySelectorAll('.switch');
        const authModals = this.#_shadowRoot.querySelectorAll(".form-wrapper .modal");

        switchBtn.forEach(link => {
            link.addEventListener('click', () => {
              authModals.forEach(modal => modal.classList.toggle("active"));
            });
          });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = form.username.value;
            const password = form.password.value;
            const error = form.querySelector('.error');
            error.textContent = '';

            if (username && password) {
                const user = {
                    username,
                    password
                };

                await authService.login(user);
                
                if (authService.isAuthenticated) {
                    window.location.href = '/';
                } else {
                    error.textContent = 'Invalid email or password';
                }

            } else {
                error.textContent = 'Please enter email and password';
            }
        });
        

    }



}

customElements.define("app-login", LoginComponent);

export const loginComponent = new LoginComponent();