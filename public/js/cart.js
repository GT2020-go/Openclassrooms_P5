//async+await >> peut aussi s'ecrire avec .then
const getTeddiesById = async (id) => {
    const response = await fetch('api/teddies/' + id)
    return await response.json();
}

const deleteFromCartFunction = (id, color) => {
    // const arraySplit = array.split(',')

    const cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)

    const result = cart.filter((item) => item._id !== id || item.color !== color)

    console.log('result :' + result)

    localStorage.setItem('cart', JSON.stringify(result))
    location.reload()
}


//fonction inserer lignes du cart:
const insertTeddy = (id, imgSource, name, color, quantity, price) => {

    const rowProduct = document.createElement("div")
    rowProduct.setAttribute("class", 'row rowProduct')

    // insert name

    const columnSm = document.createElement("div")
    columnSm.setAttribute("class", 'col')

    const insertName = document.createElement("h3")
    insertName.innerHTML = name

    columnSm.appendChild(insertName)
    rowProduct.appendChild(columnSm)

    //insert picture

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

    // incl. color:
    const columnXsColor = document.createElement("div")
    columnXsColor.setAttribute("class", 'col-xs')

    const itemColor = document.createElement("p")
    itemColor.innerHTML = 'Color: ' + color

    columnXsColor.appendChild(itemColor)
    rowProduct.appendChild(columnXsColor)


    // incl. qty:
    const columnXsQuantity = document.createElement("div")
    columnXsQuantity.setAttribute("class", 'col-xs')

    const itemQuantity = document.createElement("p")
    itemQuantity.innerHTML = 'Quantity: ' + quantity + ' unit. '

    columnXsQuantity.appendChild(itemQuantity)
    rowProduct.appendChild(columnXsQuantity)

    // incl. price:
    const columnXsPrice = document.createElement("div")
    columnXsPrice.setAttribute("class", 'col-xs')

    const itemPrice = document.createElement("p")
    itemPrice.innerHTML = quantity * price / 100 + '.00 EUR'

    columnXsPrice.appendChild(itemPrice)
    rowProduct.appendChild(columnXsPrice)



    //buttons to remove products:

    const rowButtons = document.createElement("div")
    rowButtons.setAttribute("class", 'container productContols')

    const buttonsContainer = document.createElement("div")
    buttonsContainer.setAttribute("class", 'btn-group')
    const removeButton = document.createElement("a")
    removeButton.setAttribute("class", "btn btn-light")
    removeButton.innerHTML = "Remove Article"

    console.log(id + " " + color)

    removeButton.addEventListener("click", () => deleteFromCartFunction(id, color))

    buttonsContainer.appendChild(removeButton)
    rowButtons.appendChild(buttonsContainer)
    rowProduct.appendChild(rowButtons)

}


const buildMyCart = () => {

    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
        document.getElementById("empty-cart-message").style.display = "none";
        document.getElementById("checkout-form").style.display = "block";
    }
    cart.map(async c => {
        const teddy = await getTeddiesById(c._id)
        console.log(teddy)
        console.log(c._id)
        insertTeddy(teddy._id, teddy.imageUrl, teddy.name, c.color, c.quantity, teddy.price)
        total(teddy.price / 100 * c.quantity)
    })

}


buildMyCart()


const total = (price) => {
    const start = +document.getElementById("total").innerHTML
    document.getElementById("total").innerHTML = start + +price + '.00 '
    console.log(start)
}

const validate = (e) => {
    e.preventDefault();
    console.log(e)
    var firstName = document.getElementById('first-name').value
    var nameRGEX = /^[a-zA-Z ]+$/
    var firstNameResult = nameRGEX.test(firstName)

    alert(firstNameResult)

    var lastName = document.getElementById('last-name').value
    var nameRGEX = /^[a-zA-Z ]+$/
    var lastNameResult = nameRGEX.test(lastName)

    var email = document.getElementById('email').value
    var emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    var emailResult = emailRGEX.test(email)

    var street = document.getElementById('street').value
    var streetRGEX = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*$/
    var streetResult = streetRGEX.test(street)

    var city = document.getElementById('city').value
    var cityRGEX = /^[a-zA-Z ]+$/
    var cityResult = cityRGEX.test(city)

    const contact = { 'firstName': firstName, 'lastName': lastName, 'adress': street, 'city': city, 'email': email }

    console.log(contact)

    console.log(document.getElementById('email').value)
}

//order: array of products
let order = []
const cart = JSON.parse(localStorage.getItem('cart'))
cart.map(async c => {
    await getTeddiesById(c._id)
    order.push(c._id)
})

//checkout button action:
document.getElementById('submit-button').addEventListener("click", () => checkout())

const checkout = () => {
    var form = JSON.stringify({
        "contact": {
            "firstName": document.getElementById('first-name').value,
            "lastName": document.getElementById('last-name').value,
            "address": document.getElementById('street').value,
            "city": document.getElementById('city').value,
            "email": document.getElementById('email').value
        },
        "products": order

    })

    console.log(form)

    fetch('api/teddies/order', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: form
    }).then(resp => console.log(resp))

}
// contact: {
//     * firstName: string,
//     * lastName: string,
//     * address: string,
//     * city: string,
//     * email: string
//         * }
// products: [string] < --array of product _id