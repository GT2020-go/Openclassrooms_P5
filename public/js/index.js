fetch('api/teddies')
    .then(data => data.json())
    .then(teddies => teddies.map(teddy => {
        return console.log(teddies.name = teddies[2]);
    }));
