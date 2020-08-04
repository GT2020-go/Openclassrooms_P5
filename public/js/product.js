const productId = new URL(window.location.href);
console.log(productId.searchParams.get("id"));

