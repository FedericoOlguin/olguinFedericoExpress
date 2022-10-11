let user;

let chatBox = document.getElementById('message');
const sweetAlert = async () => {
    // const { value: formValues } = await Swal.fire({
    const { value: formValues } = await Swal.fire({
        title: "Identifícate",
        html: `
        <input id="id" placeholder="Email" type="text" />
        <input id="nombre" placeholder="Nombre" type="text" />
        <input id="apellido" placeholder="Apellido" type="text" />
        <input id="age" placeholder="Edad" type="text" />
        <input id="userName" placeholder="Alias" type="text" />
        <input id="urlAvatar" placeholder="Url avatar" type="text" />
        `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("id").value,
                document.getElementById("nombre").value,
                document.getElementById("apellido").value,
                document.getElementById("age").value,
                document.getElementById("userName").value,
                document.getElementById("urlAvatar").value,
            ]
        },
        allowOutsideClick: false
    })
    // console.log(formValues);
    user = {
        id: formValues[0],
        nombre: formValues[1],
        apellido: formValues[2],
        edad: formValues[3],
        alias: formValues[4],
        avatar: formValues[5],
    }
    console.log(user);
}
// Swal.fire({
//     title: "Identifícate",
//     input: "text",
//     text: "Ingresa el usuario para identificarte en el chat",
//     inputValidator: (value) => {
//         return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
//     },
//     allowOutsideClick: false
// }).then(result => {
//     // socket.connect()
//     user = result.value
// });
sweetAlert()
chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { author: user, text: chatBox.value });
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
    let messages = "";
    data.forEach(message => {
        // let fecha = new Date(message.date)
        // let printFecha = fecha.getDate() + "/" + fecha.getMonth() + " a las " + fecha.getTimezoneOffset()
        // let printFecha = fecha.toLocaleString()
        if (message.author.nombre === user.nombre) {

            messages = messages + `
        <div style="padding: 0 1rem;border-radius:20px ;margin-top:5px;max-width: 70% ; background-color: green;align-self: flex-end;">
        <span style="font-weight: 900;">${message.author.alias}</span>: [${message.author.nombre +" "+ message.author.apellido}]</br> ${message.text}
        </div ></br>
        `
        } else {
            messages = messages + `

            <div style="padding: 0 1rem;border-radius:20px ;margin-top:5px;max-width: 70% ; background-color: lightgreen;align-self: flex-start;">
            
            <span style="font-weight: 900;">${message.author.alias}</span>: [${message.author.nombre +" "+ message.author.apellido}]</br> ${message.text}
        </div ></br>
        `
        }
    })
    log.innerHTML = messages;
})