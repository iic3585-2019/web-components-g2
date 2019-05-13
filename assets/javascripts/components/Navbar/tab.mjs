export default window.customElements.define(
  'app-tab',
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.render();
    }

    get text() {
      return this.getAttribute('text');
    }

    set text(newText) {
      this.setAttribute('text', newText);

      this.render();
    }

    get uri() {
      return this.getAttribute('uri');
    }

    set uri(newURI) {
      this.setAttribute('uri', newURI);

      this.render();
    }

    create() {
      const template = document.getElementById('tab-template');
      const clone = document.importNode(template.content, true);

      const component = clone.querySelector('.component');
      const text = component.querySelector('.text');
      const items = component.querySelector('.items');

      // setting up <text>
      text.textContent = this.text || this.textContent;
      if (this.uri) {
        text.addEventListener('click', () => window.open(this.uri, '_blank'));
        text.classList.add('with-uri');
      }

      // setting up <items>
      if (this.text) {
        component.addEventListener('mouseover', () => {
          items.classList.add('open');
        });
        component.addEventListener('mouseout', () => {
          items.classList.remove('open');
        });
      }

      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(this.create());
    }
  }
);
