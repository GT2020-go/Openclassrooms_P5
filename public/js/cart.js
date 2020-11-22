//async+await >> peut aussi s'ecrire avec .then
const getTeddiesById = async (id) => {
    const response = await fetch('api/teddies/' + id)
    return await response.json();
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


    const array = [id, color]
    removeButton.setAttribute("id", array)
    const remove = removeButton.getAttribute("id")
    console.log('var remove:' + remove)
    console.log('var type: ' + typeof (remove))

    const arraySplit = remove.split(',')
    console.log('var arraySplit:' + arraySplit)
    console.log('var type: ' + typeof (arraySplit))


    deleteFromCartFunction(arraySplit)

    //removeButton.addEventListener("click", deleteFromCartFunction(arraySplit))



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
        console.log(c)
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


const deleteFromCartFunction = (array) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)

    let result = cart.filter((item) => item._id === array[0] && item.color === array[1])
    console.log(result)

}




const validate = () => {
    var firstName = document.getElementById('first-name').value
    var nameRGEX = /^[a-zA-Z ]+$/
    var firstNameResult = nameRGEX.test(firstName)
    alert("first name: " + firstNameResult)

    var lastName = document.getElementById('last-name').value
    var nameRGEX = /^[a-zA-Z ]+$/
    var lastNameResult = nameRGEX.test(lastName)
    alert("last name: " + lastNameResult)

    var email = document.getElementById('email').value
    var emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    var emailResult = emailRGEX.test(email)
    alert("email: " + emailResult)

    var street = document.getElementById('street').value
    var streetRGEX = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*$/
    var streetResult = streetRGEX.test(street)
    alert("street: " + streetResult)


    var postCode = document.getElementById('post-code').value
    var postCodeRGEX = /^[0-9]+$/
    var postCodeResult = postCodeRGEX.test(postCode)
    alert("post code: " + postCodeResult)

    var city = document.getElementById('city').value
    var cityRGEX = /^[a-zA-Z ]+$/
    var cityResult = cityRGEX.test(city)
    alert("city: " + cityResult)

    const contact = { 'prenom': firstName, 'nom': lastName, 'adresse': street, 'ville': city, 'adresse electonique': email }
    alert(contact)

    sendOrder(contact)
}

const sendOrder = (contact) => {
    const order_id = Math.random() * (999999 - 10000) + 10000
    const order = JSON.parse(localStorage.getItem('cart'))
    const value = JSON.stringify({ contact, order, order_id })

    localStorage.setItem('order', value)

}