const formProduct = document.getElementById("form")

formProduct.addEventListener("submit", (e) => {
    e.preventDefault()
    const dataForm = new FormData(formProduct)

    fetch("/api/products", {
        method: "POST",
        body: dataForm
    }).then(res => res.json()).then(res => console.log(res))

})



