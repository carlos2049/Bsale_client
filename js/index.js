document.addEventListener("DOMContentLoaded", function (){
  // fetching(e)
  // consiole.log(e)
  // .then(result => {
  //   result.forEach(element => {
  //     createCard(element)
  //   });
    // createCard(result)
    // listenButtonProduct()
    buy()
    // category()
  });

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer')

function listenButtonProduct (){

  const addToCard = document.querySelectorAll('.button');
  addToCard.forEach((add) => {

    add.addEventListener('click', addCartClick);
  })
}

function category(e) {
    const main = document.getElementById("main")
    main.innerHTML = '';
    const categories = e.getAttribute("data-category")
    fetching(categories)

}



function buy (){
  const comprarButton = document.querySelector('.comprarButton')
  comprarButton.addEventListener('click', ()=> console.log('click'))
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

  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');  
  // console.log(textProductName)
  // console.log(elementsTitle)
  for(let i = 0 ; i < elementsTitle.length ; i++){

    console.log(elementsTitle[i].innerText)
    if( elementsTitle[i].innerText === textProductName){
      let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
      console.log(elementQuantity)
      elementQuantity.value++;
      // console.log(elementQuantity)
      shoppingCartTotal()
      return
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
  shoppingCartRow.querySelector('.button-delete').addEventListener('click', removeShoppingCartItem);
  shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged)

  shoppingCartTotal();
}

function removeShoppingCartItem(e){
  const buttonClick = e.target;
  buttonClick.closest('.shoppingCartItem').remove();
  shoppingCartTotal()

}

function quantityChanged(e){

  const input = e.target;
  input.value <= 0 ? input.value = 1 : null
  shoppingCartTotal()
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
}

function createCard(result){
  const main = document.getElementById("main")
  const getcard =document.getElementsByClassName('card')
  // getcard.closest.remove()
  // console.log(getcard)

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

 function fetching (id)  {
   return fetch(`http://localhost:2000/api/products/${id}`)
  .then((response) => {
    return response.json();
  })
  .then(result => {
    result.forEach(element => {

      createCard(element)
    });
    listenButtonProduct()
  });

}



function togglePopuup(){
  document.getElementById("popup-1").classList.toggle("active")
}