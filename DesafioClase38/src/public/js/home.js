const listProducts = document.getElementById("trBody")
const btnLogOut = document.getElementById("logOut")

let products = []

fetch("http://localhost:8080/api/products")
    .then(res => res.json())
    .then(data => {
        let list = ""
        data.products?.map(prod => {
            list += ` 
            <div class="card m-2" style="width: 18rem; background-color:transparent;height: 55vh;">
            <img style="height: 40%;object-fit: contain;" class="card-img-top" src="${prod.thumbnail}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${prod.name}</h5>
              <p class="card-text">${prod.description}.</p>
              <p class="card-text">$${prod.price}.</p>
              <p class="card-text">Disponibles: ${prod.stock}u</p>
              <a href="#" class="btn btn-primary">Agregar al carrito</a>
            </div>
          </div>
        `
        })

        listProducts.innerHTML = list
    })


btnLogOut.addEventListener("click", () => {
    window.location.replace("http://localhost:8080/")
})