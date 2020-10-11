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
    })
}

buildMyCart()

