//async+await >> peut aussi s'ecrire avec .then
const getTeddiesById = async (id) => {
    const response = await fetch('api/teddies/' + id)
    return await response.json();
}

const buildMyCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.map(async c => {
        const teddy = await getTeddiesById(c._id)
        console.log(teddy)
        console.log(c)
        insertTeddy(teddy.imageUrl, teddy.name, teddy.description, c.quantity, teddy.price)
    })
}

buildMyCart()




//fonction inserer image:

const insertTeddy = (imgSource, name, description, quantity, price) => {

    const rowProduct = document.createElement("div")
    rowProduct.setAttribute("class", 'row rowProduct')

    const columnXs = document.createElement("div")
    columnXs.setAttribute("class", 'col-xs')

    const imageWrapper = document.createElement("div")
    imageWrapper.setAttribute("class", 'img-wrap')

    const imageContainer = document.createElement("img")
    imageContainer.setAttribute("class", "img")
    imageContainer.setAttribute("src", imgSource)

    imageWrapper.appendChild(imageContainer)
    columnXs.appendChild(imageWrapper)
    rowProduct.appendChild(columnXs)
    document.getElementById("productList").appendChild(rowProduct)


    // insert name + description
    const columnSm = document.createElement("div")
    columnSm.setAttribute("class", 'col-sm')

    const row2 = document.createElement("div")
    row2.setAttribute("class", 'row')

    const insertName = document.createElement("h3")
    insertName.innerHTML = name

    const insertDescription = document.createElement("p")
    insertDescription.innerHTML = description

    row2.appendChild(insertName)
    row2.appendChild(insertDescription)
    columnSm.appendChild(row2)
    rowProduct.appendChild(columnSm)

    // incl. qty:
    const columnXsQuantity = document.createElement("div")
    columnXsQuantity.setAttribute("class", 'col-xs')

    const itemQuantity = document.createElement("p")
    itemQuantity.innerHTML = 'Quantity: ' + quantity + ' item '

    columnXsQuantity.appendChild(itemQuantity)
    rowProduct.appendChild(columnXsQuantity)

    // incl. price:
    const columnXsPrice = document.createElement("div")
    columnXsPrice.setAttribute("class", 'col-xs')

    const itemPrice = document.createElement("p")
    itemPrice.innerHTML = price / 100 + '.00 EUR'

    columnXsPrice.appendChild(itemPrice)
    rowProduct.appendChild(columnXsPrice)




    //buttons to add/remove products:

    const rowButtons = document.createElement("div")
    rowButtons.setAttribute("class", 'container productContols')

    const buttonsContainer = document.createElement("div")
    buttonsContainer.setAttribute("class", 'btn-group')

    const removeButton = document.createElement("a")
    removeButton.setAttribute("class", "btn btn-light")
    removeButton.innerHTML = "Remove Article"


    buttonsContainer.appendChild(removeButton)
    rowButtons.appendChild(buttonsContainer)
    rowProduct.appendChild(rowButtons)

}