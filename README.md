# Contexto
En el contexto de la tarea de web components se crearon 3 componentes generales que sean reutilizables en cualquier otro contexto que se desee.

# Componentes creados
 Se crearon 3 componentes Product, Rating y Navbar

 De estos componentes Rating y NavBar son los mas interesantes

 ## Rating

 Lo importante de rating es que para crear una nueva star, simplemente se hace una copia de ella, y dependiendo de si le hace click o no a la estrella, esta cambia su tipo de active o inactive

```
create(props) {
      const template = document.getElementById('rating-template');
      const clone = document.importNode(template.content, true);

      const component = clone.querySelector('.component');

      for (let i = 0; i < props.maxValue; i++) {
        const starClone = document.importNode(this.star, true);
        starClone.classList.add('star');
        starClone.addEventListener('click', () => (this.currentValue = i + 1));

        if (i >= props.currentValue) starClone.classList.add('star--inactive');

        component.appendChild(starClone);
      }

      return clone;
    }

```
Aca se observa que en el caso de hacerle click a la estrella cambia a inactive y de esta forma su estilo cambia debido al CSS asociado

# NavBar

Lo importante del navbar es que esta depende de otro componente que son los `tab` y lo mas importante del codigo es la aparición y desaparición de los tab en la barra de busqueda lo cual se relfeja en las siguientes lineas de codigo

```
if (this.text) {
  component.addEventListener('mouseover', () => {
    items.classList.add('open');
  });
  component.addEventListener('mouseout', () => {
    items.classList.remove('open');
  });
}
```

# Se requiere instalar

```
yarn global add serve
```

# Para ejecutar

```
serve .
```