const productId = new URL(window.location.href);
teddyId = productId.searchParams.get("id");
console.log(teddyId);

const productApiUrl = 'api/teddies/' + teddyId
console.log(productApiUrl)

fetch(productApiUrl)
    .then(data => data.json())

    //product est un objet: pas besoin de passer par map >> on recupere direct les values avec product.key
    .then(product => {
        const mainContainer = document.getElementById("myData")
        mainContainer.innerHTML = 'voici les couleurs: ' + product.colors + ' </br>Et la description ici: ' + product.description;
    })



{/* <div class="row pr-lg-5">
                <div class="col-md-7 mb-4">

                    <div class="view">
                        <img src="https://mdbootstrap.com/img/illustrations/graphics(4).png" class="img-fluid"
                            alt="smaple image">
                    </div>

                </div>
                <div class="col-md-5 d-flex align-items-center">
                    <div>

                        <h3 class="font-weight-bold mb-4">Material Design Blocks</h3>

                        <p>Lorem ipsum dolor sit amet consectetur adip elit. Maiores deleniti explicabo voluptatem
                            quisquam nulla asperiores aspernatur aperiam voluptate et consectetur minima delectus,
                            fugiat eum soluta blanditiis adipisci, velit dolore magnam.</p>

                        <button type="button" class="btn btn-orange btn-rounded mx-0">Download</button>

                    </div>
                </div>
            </div> */}