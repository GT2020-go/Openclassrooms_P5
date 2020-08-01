fetch('api/teddies')
    .then(data => data.json())

    .then(teddies => teddies.map(teddy => {
        const mainContainer = document.getElementById("myData");
        const div = document.createElement("div")
        div.innerHTML = 'Name: ' + teddy.name + ' ' + teddy.price + 'EUR'
        const img = document.createElement("img")
        img.setAttribute("src", teddy.imageUrl)
        mainContainer.appendChild(div);
        mainContainer.appendChild(img);
    }));
