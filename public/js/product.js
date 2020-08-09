const productId = new URL(window.location.href);
teddyId = productId.searchParams.get("id");
console.log(teddyId);

const productApiUrl = 'api/teddies/' + teddyId
console.log(productApiUrl)

fetch(productApiUrl)
    .then(data => data.json())

    //teddy est un objet: pas besoin de passer par map >> on recupere direct les values avec teddy.key
    .then(teddy => {

        const mainContainer = document.getElementById("myData")

        //Creation des Cartes produit
        const columnContainer = document.createElement("div")
        columnContainer.setAttribute("class", "col-md-8 justify-content-center")
        mainContainer.appendChild(columnContainer)

        const cardContainer = document.createElement("figure")
        cardContainer.setAttribute("class", "card card-product")
        columnContainer.appendChild(cardContainer)

        //imageWrap - conteneur image
        const imageWrap = document.createElement("div")

        imageWrap.setAttribute("class", "img-wrap")
        cardContainer.appendChild(imageWrap)

        const imageContainer = document.createElement("img")
        imageContainer.setAttribute("src", teddy.imageUrl)
        imageWrap.appendChild(imageContainer)

        //infoWrap - conteneur de text sous image
        const infoWrap = document.createElement("figcaption")
        infoWrap.setAttribute("class", "info-wrap")
        cardContainer.appendChild(infoWrap)


        const teddyName = document.createElement("h4")
        teddyName.setAttribute("class", "title")
        teddyName.innerHTML = teddy.name
        infoWrap.appendChild(teddyName)

        const teddyDescription = document.createElement("p")
        teddyDescription.setAttribute("class", "desc")
        teddyDescription.innerHTML = teddy.description
        infoWrap.appendChild(teddyDescription)

        //ensuite on ajoute un wrap pour le prix et le bouton Order(lien)
        const bottomWrap = document.createElement("div")
        bottomWrap.setAttribute("class", "bottom-wrap")
        bottomWrap.innerHTML = '            <div class="row justify-content-center"><div class="d-flex flex-wrap"><div class="select-outline position-relative w-100"><select class="mdb-select md-form md-outline" id="mySelect"><option value="" disabled selected>Choose a color...</option><!--options go here from product.js--></select><label>Color</label></div></div></div>'
        cardContainer.appendChild(bottomWrap)


        const teddyUrl = new URL('/teddy.html?id=' + teddy._id, 'http://localhost:3000') //update teddy url with id





        //add options of the teddy inside select
        const selectContainer = document.getElementById("mySelect")

        //creer fonction pour completer couleurs dans le select:
        const colorOption = teddy.colors.map(color => {
            const optionContainer = document.createElement("option")
            optionContainer.innerHTML = color
            mySelect.appendChild(optionContainer)
        })

        const orderButton = document.createElement("a")
        orderButton.setAttribute("class", "btn btn-sm btn-primary float-right")
        orderButton.setAttribute("href", teddyUrl) //replace # with link to teddy page here
        orderButton.innerHTML = "Add to Cart"
        bottomWrap.appendChild(orderButton)

        const teddyPrice = document.createElement("h5")
        teddyPrice.setAttribute("class", "price")
        teddyPrice.innerHTML = teddy.price / 100 + '.00 EUR'
        bottomWrap.appendChild(teddyPrice)
    })