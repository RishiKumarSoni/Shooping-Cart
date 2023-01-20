// tbw4HLwu@8cPJ_kRE

const imgArr = ['jumbo.jpg', 'shoe.jpg', 'suit.jpg', 'tshirt.jpg', 'tshirtandcap.jpg', 'clothes.jpg'];

let apiKey = '156fc1cbb7msh6a09f6c30732e6fp18eb6fjsnc25b04a66295';
let domain = 'https://asos2.p.rapidapi.com/';

let mainContainerRef = document.getElementById('main-container');

let imgCount = 0;

updateBanner();
getProductList();

$('#left').click(function() {
    if (imgCount){
        imgCount--;
        updateBanner();
    }
});

$('#right').click(function() {
    if (imgCount <= 4){
        imgCount++;
        updateBanner();
    }
});

function updateBanner(){
    $('#banner-img').fadeOut(50);
    $('#banner-img').fadeIn(50);

    $('#banner-img').attr('src', `./images/${imgArr[imgCount]}`);
    console.log(imgArr[imgCount]);
}

function getProductList() {
    fetch(`${domain}products/v2/list?store=US&offset=0&categoryId=4209&limit=15&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
            {method: 'GET', headers: {'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': 'asos2.p.rapidapi.com'},}
    )

    .then((response) => response.json())

    .then((data) => {
        console.log('success:', data);
        generateProductList(data?.products);
    })

    .catch((error) => { console.error('error:', error) });
    // semicolon only in the end
}

let productList = [];

function generateProductList(products) {
    mainContainerRef.innerHTML = '';

    productList = products;

    products.forEach((element, i) => {
        
        mainContainerRef.innerHTML += `
        <div id="product">
                <div>
                    <img id="img" src="https://${element.imageUrl}" alt="product-image">
                </div>
                <h4 id="name">${element.name}</h4>
    
                <div id="marking">
                    <p id="brand">${element.brandName}</p>
                    <p id="price">${element.price.current.text}</p>
                </div>
    
                <button id="button" onclick="updateCart('${i}');" type="button">Add to Cart</button>
        </div>
        `
    });
}

let cartItems = [];
let cartCountRef = document.getElementById('myShoppingCart');
let modalRef = document.getElementById('modal');
let crossRef = document.getElementById('cross');
let cartAmountRef = document.getElementById('cartAmount');

function updateCart(index) {
    cartItems.push(productList[index]);

    cartAmountRef.innerHTML = ` ${cartItems.length} `;
}



cartCountRef.onclick = function() {
    modal.style.display = 'block';
    console.log('display block');
}

crossRef.onclick = function() {
    modal.style.display = 'none';
    console.log('display none');
}

window.onclick = function (event) {
    if (event.target == modalRef) {
      modal.style.display = 'none';
    }
  }