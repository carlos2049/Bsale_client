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
  fetching(1);
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
  // console.log(e.target);
  // console.log(e.target.classList.contains('btn-dark'));
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

function listenButtonProduct() {
  const addToCard = document.querySelectorAll('.button');
  addToCard.forEach((add) => {
    add.addEventListener('click', addCartClick);
  });
}

function category(e) {
  const main = document.getElementById('main');
  main.innerHTML = '';
  const categories = e.getAttribute('data-category');
  fetching(categories);
}

function buy() {
  const comprarButton = document.querySelector('.comprarButton');
  comprarButton.addEventListener('click', () => console.log('click'));
}

function addCartClick(e) {
  const button = e.target;
  const card = button.closest('.card');
  const textProductName = card.querySelector('.product-name').textContent;
  const textImage = card.querySelector('.image').src;
  const textPrice = card.querySelector('.price').textContent;

  addItemToShopCart(textProductName, textImage, textPrice);
}

function addItemToShopCart(textProductName, textImage, textPrice) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle',
  );

  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === textProductName.trim()) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity',
      );
      elementQuantity.value++;
      shoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
    <div class="row shoppingCartItem">
      <div class="columnas">
        <div class="column-product">
          <img class="popup-shopCart" src="${textImage}" alt="">
          <h6 class="shoppingCartItemTitle" > ${textProductName} </h6>
        </div>
      </div>
      <div class="columnas">
        <div >
        <p class="shoppingCartPrice" > ${textPrice} </p>
        </div>
      </div>
      <div class="columna_quantityAndDelete">
        <div class="quantityAndDelete">
        <input type="number" class="shoppingCartItemQuantity" value="1">
        <button type="button" class="button-delete" > eliminar</button>
        </div>
      </div>
    </div>
  `;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);
  shoppingCartRow
    .querySelector('.button-delete')
    .addEventListener('click', removeShoppingCartItem);
  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  shoppingCartTotal();
}

function removeShoppingCartItem(e) {
  const buttonClick = e.target;
  buttonClick.closest('.shoppingCartItem').remove();
  shoppingCartTotal();
}

function quantityChanged(e) {
  const input = e.target;
  input.value <= 0 ? (input.value = 1) : null;
  shoppingCartTotal();
}

function shoppingCartTotal() {
  let total = 0;
  const shoppingCartTotalLabel = document.querySelector('.shopping-Cart-total');
  const shoppingCartItem = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItem.forEach((item) => {
    const shoppingCartPriceElement = item.querySelector('.shoppingCartPrice');
    const shoppingCartPrice = Number(
      shoppingCartPriceElement.textContent.replace('$', ''),
    );
    const shoppingCartItemQuantityElement = item.querySelector(
      '.shoppingCartItemQuantity',
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value,
    );
    total = total + shoppingCartItemQuantity * shoppingCartPrice;
  });
  shoppingCartTotalLabel.innerHTML = `TOTAL $ ${total}`;
}

function createCard(result) {
  const main = document.getElementById('main');
  const getcard = document.getElementsByClassName('card');
  // getcard.closest.remove()
  // console.log(getcard)

  const tamplate = `
    <div class="card">
    <div class="product-name">
    
    </div>
    <div class="size-image"></div>
    <div class="price"></div>
    <div class="add">
      <button></button>
    </div>
    </div>
   
  `;
  const card = document.createElement('div');
  const productName = document.createElement('div');
  const sizeImage = document.createElement('div');
  const price = document.createElement('div');
  const add = document.createElement('div');

  const image = document.createElement('img');
  const addButton = document.createElement('button');
  sizeImage.appendChild(image);
  add.appendChild(addButton);

  card.className = 'card';
  productName.className = 'product-name';
  sizeImage.className = 'size-image';
  image.className = 'image';
  image.src = result.url_image
    ? result.url_image
    : 'https://via.placeholder.com/150x150.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide';
  price.className = 'price';
  add.className = 'add';
  addButton.className = 'button';

  var textproductName = document.createTextNode(result.name);
  // var textsizeImage = document.createTextNode("");
  // var textImage = document.createTextNode("image")
  var textprice = document.createTextNode(`$ ${result.price}`);
  var textadd = document.createTextNode('agregar');

  productName.appendChild(textproductName);
  // sizeImage.appendChild(textsizeImage);
  price.appendChild(textprice);
  addButton.appendChild(textadd);

  card.appendChild(productName);
  card.appendChild(sizeImage);
  card.appendChild(price);
  card.appendChild(add);
  main.appendChild(card);
}

const fetching = async (id) => {
  // return fetch(`http://localhost:2000/api/products/${id}`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((result) => {
  //     result.forEach((element) => {
  //       createCard(element);
  //     });
  //     listenButtonProduct();
  //   });

  try {
    const res = await fetch(`http://localhost:2000/api/products/${id}`);
    const data = await res.json();
    // console.log(data);
    data.forEach((element) => {
      templateCard.querySelector('h5').textContent = element.name;
      templateCard.querySelector('p').textContent = element.price;
      templateCard.querySelector('img').setAttribute('src', element.url_image);
      templateCard.querySelector('.btn-dark').dataset.id = element.id;
      // createCard(element);
      const clone = templateCard.cloneNode(true);
      fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
    listenButtonProduct();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function togglePopuup() {
  document.getElementById('popup-1').classList.toggle('active');
}
