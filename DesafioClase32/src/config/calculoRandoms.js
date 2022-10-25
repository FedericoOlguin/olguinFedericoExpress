process.on("message", info => {
    let cant = parseInt(info) || 1e8
    // console.log(cant);
    const element = {}
    let array = []
    for (let index = 0; index < cant; index++) {
        array.push(Math.floor(Math.random() * 1000 + 1))
    }
    let ordenado = array.sort()
    let contador = 0
    for (let i = 0; i < ordenado.length; i++) {
        if (ordenado[i + 1] === ordenado[i]) {
            contador++
        } else if (contador !== 0) {
            element[ordenado[i]] = contador
            contador = 0
        } else {
            element[ordenado[i]] = 1
        }
    }
    process.send(element)
})