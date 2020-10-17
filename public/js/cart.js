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

        insertMainRow()
        insertImage("img", teddy.imageUrl)
    })
}

buildMyCart()




//fonction inserer image:

const insertImage = (imgClass, imgSource) => {
    const imageContainer = document.createElement("img")
    imageContainer.setAttribute("class", imgClass)
    imageContainer.setAttribute("src", imgSource)
    document.getElementById("productList").appendChild(imageContainer)
}

//Build the cart element by element

const insertMainRow = () => {
    const rowProduct = document.createElement("div")
    rowProduct.setAttribute("class", 'row')
    rowProduct.setAttribute("id", 'item')
    document.getElementById("productList").appendChild(rowProduct)
}