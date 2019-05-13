import tab from './tab.mjs';
import { htmlToNode } from './helpers.mjs'

export default window.customElements.define(
  'app-navbar',
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.render();
    }

    create() {
      const template = document.getElementById('navbar-template');
      const clone = document.importNode(template.content, true);

      const component = clone.querySelector('.component');

      const ghost = htmlToNode('<div class="ghost" />');
      component.parentNode.insertBefore(ghost, component.nextSibling);

      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(this.create());
    }
  }
);
