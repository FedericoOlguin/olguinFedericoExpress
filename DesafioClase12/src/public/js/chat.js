let user;

let chatBox = document.getElementById('mesagge');
Swal.fire({
    title: "Identifícate",
    input: "text",
    text: "Ingresa el usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
    },
    allowOutsideClick: false
}).then(result => {
    // socket.connect()
    user = result.value
});

chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("mesagge", { user: user, mesagge: chatBox.value, date: new Date() });
            chatBox.value = "";
        }
    }
})

socket.on('newConnection', data => {
    if (user) {
        Swal.fire({
            text: "Nuevo usuario conectado",
            toast: true,
            position: "top-right"
        })
    }
});

socket.on('log', data => {
    console.log(data);
    let log = document.getElementById('chatBox');
    let mesagges = "";
    data.forEach(mesagge => {
        let fecha = new Date(mesagge.date)
        // let printFecha = fecha.getDate() + "/" + fecha.getMonth() + " a las " + fecha.getTimezoneOffset()
        let printFecha = fecha.toLocaleString()
        if (mesagge.user === user) {

            mesagges = mesagges + `
        <div style="padding: 0 1rem;border-radius:20px ;margin-top:5px;max-width: 70% ; background-color: green;align-self: flex-end;">
        <span style="font-weight: 900;">${mesagge.user}</span>:[${printFecha}]</br> ${mesagge.mesagge}
        </div ></br>
        `
        } else {
            mesagges = mesagges + `

            <div style="padding: 0 1rem;border-radius:20px ;margin-top:5px;max-width: 70% ; background-color: lightgreen;align-self: flex-start;">
            
            <span style="font-weight: 900;">${mesagge.user}</span>:[${printFecha}]</br> ${mesagge.mesagge}
        </div ></br>
        `
        }
    })
    log.innerHTML = mesagges;
})