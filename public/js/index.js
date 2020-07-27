fetch('api/teddies')
    .then(data => data.json())
    .then(teddies => teddies.map(teddy => {
        return console.log(teddies.name = teddies[2]);
    }));


var btn = document.createElement("BUTTON");   // Create a <button> element
btn.innerHTML = "CLICK ME";                   // Insert text
document.body.appendChild(btn);               // Append <button> to <body>