fetch('api/teddies')
    .then(data => data.json())

    .then(teddies => teddies.map(teddy => {
        const mainContainer = document.getElementById("myData");
        const div = document.createElement("div")
        div.setAttribute("id", teddy._id)
        div.setAttribute("class", "name")
        div.innerHTML = 'Name: ' + teddy.name + ' ' + teddy.price + 'EUR'

        const img = document.createElement("img")
        img.setAttribute("src", teddy.imageUrl)

        const divDescrip = document.createElement("div")
        divDescrip.setAttribute("class", "description")
        divDescrip.innerHTML = teddy.description

        mainContainer.appendChild(div);
        mainContainer.appendChild(img);
        mainContainer.appendChild(divDescrip);
    }));