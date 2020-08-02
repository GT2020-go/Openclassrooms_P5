fetch('api/teddies')
    .then(data => data.json())

    .then(teddies => teddies.map(teddy => {
        const mainContainer = document.getElementById("myData");
        // const div = document.createElement("div")
        // div.setAttribute("id", teddy._id)
        // div.setAttribute("class", "name")
        // div.innerHTML = 'Name: ' + teddy.name + ' ' + teddy.price + 'EUR'

        // const a = document.createElement("a")
        // a.setAttribute("class", "btn btn-primary btn-lg")
        // a.innerHTML = 'Add to cart'

        // const imageContainer = document.getElementById("imageTeddy");
        // const img = document.createElement("img")
        // img.setAttribute("src", teddy.imageUrl)

        // const divDescrip = document.createElement("div")
        // divDescrip.setAttribute("class", "description")
        // divDescrip.innerHTML = teddy.description

        // mainContainer.appendChild(div);
        // mainContainer.appendChild(a);
        // imageContainer.appendChild(img);
        // mainContainer.appendChild(divDescrip);

        const columnContainer = document.createElement("div")
        columnContainer.setAttribute("class", "col-md-4")
        mainContainer.appendChild(columnContainer)

        const cardContainer = document.createElement("figure")
        cardContainer.setAttribute("class", "card card-product")
        columnContainer.appendChild(cardContainer)

        const imageWrap = document.createElement("div")
        imageWrap.setAttribute("class", "img-wrap")
        cardContainer.appendChild(imageWrap);

        const imageContainer = document.createElement("img")
        imageContainer.setAttribute("src", teddy.imageUrl)
        imageWrap.appendChild(imageContainer)

        const infoWrap = document.createElement("figcaption")
        infoWrap.setAttribute("class", "info-wrap")
        imageContainer.appendChild(infoWrap)


        const teddyName = document.createElement("h4")
        teddyName.setAttribute("class", "title")
        teddyName.innerHTML = teddy.name

        const teddyDescription = document.createElement("p")
        teddyDescription.setAttribute("class", "desc")
        teddyDescription.innerHTML = teddy.description

    }));




// < div class="col-md-4" >
//     <figure class="card card-product">
//         <div class="img-wrap"><img src="https://s9.postimg.org/tupxkvfj3/image.jpg"></div>
//             <figcaption class="info-wrap">
//                 <h4 class="title">Another name of item</h4>
//                 <p class="desc">Some small description goes here</p>
//                 <div class="rating-wrap">
//                     <div class="label-rating">132 reviews</div>
//                     <div class="label-rating">154 orders </div>
//                 </div> <!-- rating-wrap.// -->
// 		</figcaption>
//             <div class="bottom-wrap">
//                 <a href="" class="btn btn-sm btn-primary float-right">Order Now</a>
//                 <div class="price-wrap h5">
//                     <span class="price-new">$1280</span> <del class="price-old">$1980</del>
//                 </div> <!-- price-wrap.// -->
// 		</div> <!-- bottom-wrap.// -->
// 	</figure>
// </div> <!--col // --></div>