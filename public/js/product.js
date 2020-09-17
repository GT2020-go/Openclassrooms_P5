const productId = new URL(window.location.href);
teddyId = productId.searchParams.get("id");
console.log(teddyId);

const productApiUrl = 'api/teddies/' + teddyId
console.log(productApiUrl)

fetch(productApiUrl)
    .then(data => data.json())

    //teddy est un objet: pas besoin de passer par map >> on recupere direct les values avec teddy.key
    .then(teddy => {

        //Form created directly in HTML


        //imageWrap - conteneur image
        // const imageWrap = document.getElementById("img-wrap")

        insertImage("img", teddy.imageUrl)

        insertColorList(teddy)

        insertName(teddy)

        insertDescription(teddy)

        // const teddyDescription = document.createElement("p")
        // teddyDescription.setAttribute("class", "desc")
        // teddyDescription.innerHTML = teddy.description
        // infoWrap.appendChild(teddyDescription)

        // //ensuite on ajoute un wrap pour le prix et le bouton Order(lien)
        // const bottomWrap = document.createElement("div")
        // bottomWrap.setAttribute("class", "bottom-wrap")
        // bottomWrap.innerHTML = '<div class="row justify-content-center"><div class="d-flex flex-wrap"><div class="select-outline position-relative w-100"><select class="mdb-select md-form md-outline" id="mySelect" form="addToCartForm"><option value="" disabled selected>Choose a color...</option><!--options go here from product.js--></select><label>Color</label></div></div></div>'
        // cardContainer.appendChild(bottomWrap)


        // const teddyUrl = new URL('/teddy.html?id=' + teddy._id, 'http://localhost:3000') //update teddy url with id





        // const orderButton = document.createElement("a")
        // orderButton.setAttribute("class", "btn btn-sm btn-primary float-right")
        // orderButton.setAttribute("href", teddyUrl) //replace # with link to teddy page here
        // orderButton.innerHTML = "Add to Cart"
        // bottomWrap.appendChild(orderButton)

        // const teddyPrice = document.createElement("h5")
        // teddyPrice.setAttribute("class", "price")
        // teddyPrice.innerHTML = teddy.price / 100 + '.00 EUR'
        // bottomWrap.appendChild(teddyPrice)
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
        document.getElementById("mySelect").appendChild(optionContainer)
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

//add products to cart function:

const addToCartFunction = () => {
    alert('Items added to cart')
}
