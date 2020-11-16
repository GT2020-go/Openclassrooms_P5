const productId = new URL(window.location.href);
teddyId = productId.searchParams.get("id");
console.log(teddyId);

const productApiUrl = 'api/teddies/' + teddyId
console.log(productApiUrl)

fetch(productApiUrl)
    .then(data => data.json())

    //teddy est un objet: pas besoin de passer par map >> on recupere direct les values avec teddy.key
    .then(teddy => {

        insertImage("img", teddy.imageUrl)

        insertColorList(teddy)

        insertName(teddy)

        insertDescription(teddy)

        insertPrice(teddy)

        const x = document.getElementById("addToCartBtn");

        x.addEventListener("click", addToCartFunction);
    })


//fonction inserer image:

const insertImage = (imgClass, imgSource) => {
    const imageContainer = document.createElement("img")
    imageContainer.setAttribute("class", imgClass)
    imageContainer.setAttribute("src", imgSource)
    document.getElementById("img-wrap").appendChild(imageContainer)
}

//fonction inserer liste couleurs:

const insertColorList = (product) => {
    product.colors.map(color => {
        const optionContainer = document.createElement("option")
        optionContainer.innerHTML = color
        document.getElementById("myColor").appendChild(optionContainer)
    })
}

//fonction inserer nom:

const insertName = (product) => {
    const teddyName = document.getElementById("teddyName")
    teddyName.append(product.name)
}

//fonction inserer description:

const insertDescription = (product) => {
    const teddyDescription = document.getElementById("teddyDescription")
    teddyDescription.append(product.description)
}

//fonction inserer prix:

const insertPrice = (product) => {
    const teddyPrice = document.getElementById("teddyPrice")
    teddyPrice.append(product.price / 100 + '.00 EUR')
}

//add products to cart function:
const addToCartFunction = (id, color, qty) => {
    let cartItem = JSON.parse(localStorage.getItem('cart'));
    if (!cartItem) {
        cartItem = []
    }

    id = teddyId;
    color = document.getElementById("myColor").value;
    qty = +(document.getElementById("myQuantity").value);


    if (cartItem.some(cart => cart._id === id && cart.color === color)) {
        console.log('test')
        cartItem.map(cart => {
            if (cart._id === id && cart.color === color) {
                cart.quantity += qty
            }
        })
    } else {
        cartItem.push({ "_id": id, "color": color, 'quantity': +qty })
    }

    localStorage.setItem('cart', JSON.stringify(cartItem))

}