import GameScreenComponent from './components/game-screen/game-screen.js';
import LoginComponent from './components/auth/auth.js';
import { pathToRegexp } from 'path-to-regexp';
import { socketService } from './services/socket.service.js';

export class Router extends HTMLElement {
  #_shadowRoot = null;
  #currentPath = null;

  constructor() {
    super();
    this.routes = {
        '/login/': LoginComponent,
        '/': GameScreenComponent,
    };

    this._currentComponentInstance = null;
    this._currentComponentContainer = null;
    this._currentComponentContainerId = null;

    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
  }

  render(path, skipHistory = false) {
    let ctor = null;
    for (const [key, value] of Object.entries(this.routes)) {
      const keyRe = pathToRegexp(key);
      if (!keyRe.test(path)) { continue; }
      ctor = value;
      break;
    }

    if (!ctor) {
      console.error('Route not found!')
    }
    if (this.#currentPath === path) { return; }
    this.#currentPath = path;

    const instance = new ctor();
    if (this.#_shadowRoot.children[0]) {
      this.#_shadowRoot.removeChild(this.#_shadowRoot.children[0]);
    }
    this.#_shadowRoot.appendChild(instance);
    socketService.appendComponent(instance);

    if (skipHistory) { return; }
    history.pushState('', '', path);
  }

  popstateHandler = (e) => {
    e.preventDefault();
    this.render(location.pathname, true);
  };

  connectedCallback() {
    this.render(location.pathname);
    window.addEventListener('popstate', this.popstateHandler);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.popstateHandler);
  }
}

customElements.define('app-router', Router);
