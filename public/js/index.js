fetch('api/teddies')
    .then(data => data.json())

    .then(teddies => teddies.map(teddy => {
        const mainContainer = document.getElementById("myData")

        //Creation des Cartes produit
        const columnContainer = document.createElement("div")
        columnContainer.setAttribute("class", "col-md-4")
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

        // const teddyDescription = document.createElement("p")
        // teddyDescription.setAttribute("class", "desc")
        // teddyDescription.innerHTML = teddy.description
        // infoWrap.appendChild(teddyDescription)

        //ensuite on ajoute un wrap pour le prix et le bouton Order(lien)
        const bottomWrap = document.createElement("div")
        bottomWrap.setAttribute("class", "bottom-wrap")
        cardContainer.appendChild(bottomWrap)


        const productUrl = new URL('/product.html?id=' + teddy._id, 'http://localhost:3000') //update product url with id


        const orderButton = document.createElement("a")
        orderButton.setAttribute("class", "btn btn-sm btn-primary float-right")
        orderButton.setAttribute("href", productUrl) //replace # with link to product page here
        orderButton.innerHTML = "Choose color"
        bottomWrap.appendChild(orderButton)

        const teddyPrice = document.createElement("h5")
        teddyPrice.setAttribute("class", "price")
        teddyPrice.innerHTML = teddy.price / 100 + '.00 EUR'
        bottomWrap.appendChild(teddyPrice)

    }));