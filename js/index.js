



document.addEventListener("DOMContentLoaded", function (){
  fetching()
  .then(result => {
    result.forEach(element => {
      createCard(element)
    });
    // createCard(result)
  jii()
  });
  
})
const shoppingCart = document.querySelector('.shopping-cart-container')


function jii (){
  const addToCard = document.querySelectorAll('.button');
  addToCard.forEach((add) => {
    add.addEventListener('click', addCartClick)
  })
}

function addCartClick(e){
  const button = e.target;
  const card = button.closest('.card')
  const textProductName = card.querySelector('.product-name').textContent
  const textImage = card.querySelector('.image').src
  const textPrice = card.querySelector('.price').textContent

  addItemToShopCart(textProductName, textImage, textPrice)

}

function addItemToShopCart(textProductName, textImage, textPrice){
  // console.log(textProductName)
  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
    <div class="row shoppingCartItem">
      <div class="columnas">
        <div>
          <img class="popup-shopCart" src="${textImage}" alt="">
          <h6> ${textProductName} </h6>
        </div>
      </div>
      <div class="columnas">
        <div >
        <p class="shoppingCartPrice" > ${textPrice} </p>
        </div>
      </div>
      <div class="columnas">
        <div>
        <input type="number" class="shoppingCartItemQuantity" value="1">
        <button type="button" class="button-delete" > eliminar</button>
        </div>
      </div>
    </div>
  `;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCart.append(shoppingCartRow);
  shoppingCartRow.querySelector('.button-delete').addEventListener('click', removeShoppingCartItem);
  shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', ()=> console.log('change'))

  shoppingCartTotal();
}

function removeShoppingCartItem(e){
  const buttonClick = e.target;
  buttonClick.closest('.shoppingCartItem').remove();
  shoppingCartTotal()
  console.log(buttonClick)

}


function shoppingCartTotal (){

  let total = 0
  const shoppingCartTotalLabel = document.querySelector('.shopping-Cart-total')
  const shoppingCartItem = document.querySelectorAll('.shoppingCartItem')
  
  shoppingCartItem.forEach(item => {
    const shoppingCartPriceElement = item.querySelector('.shoppingCartPrice')
    const shoppingCartPrice = Number(shoppingCartPriceElement.textContent.replace('$', ''))
    const shoppingCartItemQuantityElement = item.querySelector('.shoppingCartItemQuantity')
    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value)
    total = total + shoppingCartItemQuantity * shoppingCartPrice
  })
  shoppingCartTotalLabel.innerHTML = `TOTAL $ ${total}`
  console.log(total)
}

function createCard(result){
  const main = document.getElementById("main")

  const card = document.createElement("div");

  const productName = document.createElement("div");
  const sizeImage = document.createElement("div");
  const image = document.createElement("img");
  const price = document.createElement("div");
  const add = document.createElement("div");
  const addButton = document.createElement("button")
  sizeImage.appendChild(image)
  add.appendChild(addButton)

  card.className= "card";
  productName.className = "product-name";
  sizeImage.className = "size-image";
  image.className = "image"
  image.src = result.url_image ? result.url_image : "https://via.placeholder.com/150x150.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide"
  price.className = "price";
  add.className = "add";
  addButton.className = "button"

  var textproductName = document.createTextNode( result.name);
  // var textsizeImage = document.createTextNode("");
  // var textImage = document.createTextNode("image")
  var textprice = document.createTextNode(`$ ${result.price}`);
 var textadd = document.createTextNode("agregar");

  
  productName.appendChild(textproductName);
  // sizeImage.appendChild(textsizeImage);
  price.appendChild(textprice);
  addButton.appendChild(textadd);
  
  card.appendChild(productName)
  card.appendChild(sizeImage)
  card.appendChild(price)
  card.appendChild(add)
  main.appendChild(card)


}

 function fetching ()  {
   return fetch('http://localhost:2000/api/products/1')
  .then((response) => {
    return response.json();
  })

}



function crear_div(){

  const div = document.getElementById("main")

  const card1 = document.createElement("div");
  card1.className = "card";
  for (var i = 0; i < 3; i++) {

    const card2 = document.createElement("div");
    const productName = document.createElement("div");
    const sizeImage = document.createElement("div");
    const price = document.createElement("div");
    const add = document.createElement("div");

    card2.className = "card";
    productName.className = "product-name";
    sizeImage.className = "size-image";
    price.className = "price";
    add.className = "add";

    var textproductName = document.createTextNode("nombre producto ");
    var textsizeImage = document.createTextNode("image");
    var textprice = document.createTextNode("price");
    var textadd = document.createTextNode("add");
    productName.appendChild(textproductName);
    sizeImage.appendChild(textsizeImage);
    price.appendChild(textprice);
    add.appendChild(textadd);
    
    card2.appendChild(productName)
    card2.appendChild(sizeImage)
    card2.appendChild(price)
    card2.appendChild(add)
    div.appendChild(card2)
  }

  // div.appendChild(card1)
}

function togglePopuup(){
  document.getElementById("popup-1").classList.toggle("active")
}