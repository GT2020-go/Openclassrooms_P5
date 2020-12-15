//async+await >> peut aussi s'ecrire avec .then
const getTeddiesById = async (id) => {
    const response = await fetch('api/teddies/' + id)
    return await response.json();
}


// fonction: supprimer lignes du cart:
const deleteFromCartFunction = (id, color) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const result = cart.filter((item) => item._id !== id || item.color !== color)

    if (result.length !== 0) {
        localStorage.setItem('cart', JSON.stringify(result))
    } else {
        localStorage.removeItem('cart')
    }
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
        insertTeddy(teddy._id, teddy.imageUrl, teddy.name, c.color, c.quantity, teddy.price)
        total(teddy.price / 100 * c.quantity)
    })

}


buildMyCart()


const total = (price) => {
    const start = +document.getElementById("total").innerHTML
    document.getElementById("total").innerHTML = start + +price + '.00 '
}


// supprimer les const
const validate = () => {
    let firstName = document.getElementById('first-name').value
    let nameRGEX = /^[a-zA-Z ]+$/
    let firstNameResult = nameRGEX.test(firstName)

    let lastName = document.getElementById('last-name').value
    let lastNameResult = nameRGEX.test(lastName)

    let email = document.getElementById('email').value
    let emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let emailResult = emailRGEX.test(email)

    let street = document.getElementById('street').value
    let streetRGEX = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*$/
    let streetResult = streetRGEX.test(street)

    let city = document.getElementById('city').value
    let cityRGEX = /^[a-zA-Z ]+$/
    let cityResult = cityRGEX.test(city)

    const contact = { 'firstName': firstName, 'lastName': lastName, 'adress': street, 'city': city, 'email': email }

    if (firstNameResult == false | lastNameResult == false | emailResult == false | streetResult == false | cityResult == false) {
        alert("Please enter correct contact details")
        return false
    } else {
        return true
    }

}

//order: array of products
let order = []
const cart = JSON.parse(localStorage.getItem('cart'))
cart.map(async c => {
    await getTeddiesById(c._id)
    order.push(c._id)
})


const confirmation = () => {

    const orderNumber = Math.floor(Math.random() * (99999999 - 10000000) + 10000000)
    const orderTotal = +document.getElementById("total").innerHTML

    localStorage.setItem('orderConfirmation', JSON.stringify({ "orderNumber": orderNumber, "orderTotal": orderTotal }))

    window.location.replace("order.html");

}

const checkout = () => {
    if (validate() == false) {
        window.location.reload()
    } else {
        let form = JSON.stringify({
            "contact": {
                "firstName": document.getElementById('first-name').value,
                "lastName": document.getElementById('last-name').value,
                "address": document.getElementById('street').value,
                "city": document.getElementById('city').value,
                "email": document.getElementById('email').value
            },
            "products": order

        })

        fetch('api/teddies/order', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: form
        }).then(resp => console.log(resp))

        confirmation()

    }
}

//checkout button action:
document.getElementById('submit-button').addEventListener("click", () => checkout())