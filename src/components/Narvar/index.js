window.customElements.define(
  'app-narvar',
  class extends HTMLElement {
    constructor() {
      super();

      const navbar = this.querySelector('*[slot="navbar"]');
      const elements = this.querySelectorAll('*[slot="element"]');
      const childs = {};
      for (const element of elements) {
        childs[element.innerText] = this.querySelectorAll(
          '*[slot="' + element.innerText + '"]'
        );
      }
      this.navbar = document.importNode(navbar, true);
      navbar.remove();
      this.elements = elements;
      this.childs = childs;

      this.attachShadow({ mode: 'open' });
      this.render();
    }
    create() {
      const template = document.getElementById('narvar-template');
      const clone = document.importNode(template.content, true);
      const component = clone.querySelector('.component');
      for (const element of this.elements) {
        element.classList.add('element');
        element.addEventListener('mouseover', () => {
          for (const keys in this.childs) {
            if (keys === element.innerText) {
              for (const child of this.childs[keys]) {
                child.classList.add('child');
                element.appendChild(child);
              }
            }
          }
        });
        this.navbar.appendChild(element);
      }
      component.appendChild(this.navbar);
      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(this.create());
    }
  }
);

export default () => {
  const component = document.createElement('app-narvar');

  return component;
};
