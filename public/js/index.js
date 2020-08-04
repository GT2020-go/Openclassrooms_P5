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

        const orderButton = document.createElement("a")
        orderButton.setAttribute("class", "btn btn-sm btn-primary float-right")
        orderButton.setAttribute("href", "#") //replace # with link to product page here
        orderButton.innerHTML = "Choose color"
        bottomWrap.appendChild(orderButton)

        const teddyPrice = document.createElement("h5")
        teddyPrice.setAttribute("class", "price")
        teddyPrice.innerHTML = teddy.price / 100 + '.00 EUR'
        bottomWrap.appendChild(teddyPrice)

    }));




// < div class="col-md-4" >
//     <figure class="card card-product">
//         <div class="img-wrap"><img src="https://s9.postimg.org/tupxkvfj3/image.jpg"></div>
//             <figcaption class="info-wrap">
//                 <h4 class="title">Another name of item</h4>
//                 <p class="desc">Some small description goes here</p>
// 		</figcaption>
//             <div class="bottom-wrap">
//                 <a href="" class="btn btn-sm btn-primary float-right">Order Now</a>
//                 <div class="price-wrap h5">
//                     <span class="price-new">$1280</span> <del class="price-old">$1980</del>
//                 </div> <!-- price-wrap.// -->
// 		</div> <!-- bottom-wrap.// -->
// 	</figure>
// </div> <!--col // --></div>