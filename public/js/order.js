// remove the cart:
localStorage.removeItem('cart')

// build confirmation page:
const buildConfirmation = () => {
    const orderNumber = JSON.parse(localStorage.getItem('orderConfirmation')).orderNumber
    document.getElementById("orderNumber").innerHTML = orderNumber
    const orderTotal = JSON.parse(localStorage.getItem('orderConfirmation')).orderTotal
    document.getElementById("orderTotal").innerHTML = orderTotal
}

buildConfirmation()

