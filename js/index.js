const cards = document.getElementById('cards');
const footer = document.getElementById('footer');
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
// const templateCart = document.getElementById('template-table').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', function () {
  // fetching(e)
  // fetching(1);
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    pintarCarrito();
  }
});

cards.addEventListener('click', (e) => {
  addToCard(e);
});

items.addEventListener('click', (e) => {
  btnAccion(e);
});

const btnAccion = (e) => {
  if (e.target.classList.contains('btn-info')) {
    carrito[e.target.dataset.id];
    const producto = carrito[e.target.dataset.id];
    producto.quantity++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }

  if (e.target.classList.contains('btn-danger')) {
    carrito[e.target.dataset.id];
    const producto = carrito[e.target.dataset.id];
    producto.quantity--;
    if (producto.quantity === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
  }
  e.stopPropagation();
};

const addToCard = (e) => {
  if (e.target.classList.contains('btn-dark')) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (object) => {
  // console.log(object);
  const product = {
    id: object.querySelector('.btn-dark').dataset.id,
    name: object.querySelector('h5').textContent,
    price: object.querySelector('p').textContent,
    quantity: 1,
  };

  if (carrito.hasOwnProperty(product.id)) {
    product.quantity = carrito[product.id].quantity + 1;
  }
  carrito[product.id] = { ...product };
  pintarCarrito();
};

const pintarCarrito = () => {
  // console.log(carrito);
  items.innerHTML = '';
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector('th').textContent = producto.id;
    templateCarrito.querySelectorAll('td')[0].textContent = producto.name;
    templateCarrito.querySelectorAll('td')[1].textContent = producto.quantity;
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
    templateCarrito.querySelector('span').textContent =
      producto.quantity * producto.price;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  pintarFooter();
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = '';
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacio</th>
    `;
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { quantity }) => acc + quantity,
    0,
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0,
  );

  templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
  templateFooter.querySelector('span').textContent = nPrecio;
  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);
  vaciarCarrito();
};

const vaciarCarrito = () => {
  const btnVaciar = document.getElementById('vaciar-carrito');
  btnVaciar.addEventListener('click', () => {
    carrito = {};
    pintarCarrito();
  });
};

function category(e) {
  const main = document.getElementById('main');
  // main.innerHTML = '';
  const categories = e.getAttribute('data-category');
  // console.log(categories);

  fetching(categories);
}

const fetching = async (id) => {
  console.log(id);

  try {
    const res = await fetch(
      `https://bsale-test2.herokuapp.com/api/products/${id}`,
      {
        // method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    );
    const data = await res.json();
    console.log(data);
    cards.innerHTML = '';
    data.forEach((element) => {
      templateCard.querySelector('h5').textContent = element.name;
      templateCard.querySelector('p').textContent = `$ ${element.price}`;
      templateCard.querySelector('img').setAttribute('src', element.url_image);
      templateCard.querySelector('.btn-dark').dataset.id = element.id;
      const clone = templateCard.cloneNode(true);
      fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
    return data;
  } catch (error) {
    console.log(error);
  }
};

function togglePopuup() {
  document.getElementById('popup-1').classList.toggle('active');
}
