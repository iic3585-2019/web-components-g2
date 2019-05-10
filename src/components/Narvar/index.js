window.customElements.define(
  'app-narvar',
  class extends HTMLElement {
    constructor() {
      super();

      const element = this.querySelector('*[slot="element"]');
      this.element = document.importNode(element, true);
      element.remove();

      this.attachShadow({ mode: 'open' });
      this.render();
    }

    get maxValue() {
      return this.getAttribute('max-value');
    }

    set maxValue(newMaxValue) {
      this.setAttribute('max-value', newMaxValue);

      this.render();
    }

    create(props) {
      const template = document.getElementById('narvar-template');
      const clone = document.importNode(template.content, true);
      const component = clone.querySelector('.component');
      const elements = ['Home', 'Dormitorio', 'Muebles', 'Mujer', 'Tecnologia'];
      const childs = {
        Home: [],
        Dormitorio: ['Salas de estar', 'Camas', 'Sillones'],
        Muebles: ['Comedor', 'Escritorios'],
        Mujer: ['Vestidos', 'Maquillajes', 'Perfumes'],
        Tecnologia: ['Videojuegos', 'Computadores', 'Camaras'],
      };

      for (let i = 0; i < props.maxValue; i++) {
        if (i < elements.length) {
          const elementClone = document.importNode(this.element, true);
          elementClone.classList.add('element');
          elementClone.textContent = elements[i];
          elementClone.addEventListener('mouseover', () => {
            elementClone.classList.remove('element');
            elementClone.classList.add('element-press');
            for (const keys in childs) {
              if (keys === elementClone.textContent) {
                for (const child of childs[keys]) {
                  const childElementClone = document.importNode(
                    this.element,
                    true
                  );
                  childElementClone.classList.add('child');
                  childElementClone.textContent = child;
                  childElementClone.addEventListener('mouseover', () => {
                    childElementClone.classList.remove('child');
                    childElementClone.classList.add('child-press');
                  });
                  childElementClone.addEventListener('mouseout', () => {
                    childElementClone.classList.remove('child-press');
                    childElementClone.classList.add('child');
                  });
                  elementClone.appendChild(childElementClone);
                }
              }
            }
          });
          elementClone.addEventListener('mouseout', () => {
            elementClone.classList.remove('element-press');
            elementClone.classList.add('element');

            let text;
            for (const child of elementClone.childNodes) {
              if (child.nodeName === '#text') {
                text = child;
              }
            }
            while (elementClone.firstChild) {
              elementClone.removeChild(elementClone.firstChild);
            }
            elementClone.textContent = text.textContent;
          });
          component.appendChild(elementClone);
        } else {
          break;
        }
      }
      return clone;
    }

    render() {
      const component = this.shadowRoot.querySelector('.component');
      if (component) this.shadowRoot.removeChild(component);

      this.shadowRoot.appendChild(
        this.create({
          maxValue: Number(this.maxValue),
        })
      );
    }
  }
);

export default () => {
  const component = document.createElement('app-narvar');

  return component;
};
