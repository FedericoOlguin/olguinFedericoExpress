const formProduct = document.getElementById("form")
const listProducts = document.getElementById("trBody")
const btnLogOut = document.getElementById("logOut")
const socket = io()

let products = []

formProduct.addEventListener("submit", (e) => {
    e.preventDefault()
    const dataForm = new FormData(formProduct)
    const obj = {}
    dataForm.forEach((value, key) => obj[key] = value)
    socket.emit("addProduct", {
        obj
    })
})

socket.on("listProduct", data => {

    let list = ""
    data.products?.map(prod => {
        list = list + ` 
        <tr  >
        <td class="w-50">${prod.title}</td>
        <td class="w-25">$${prod.price} </td>
        <td class="w-100  d-flex flex-row justify-content-end"><img
        src="${prod.thumbnail}}" alt="prodImage"
        class="img-fluid w-100 bg-transparent "></td>
        </tr>
        `
    })
    listProducts.innerHTML = list
})




btnLogOut.addEventListener("click", () => {
    window.location.replace("http://localhost:8080/logout")
})


