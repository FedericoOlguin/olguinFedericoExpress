const form = document.getElementById("formLogIn")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = new FormData(form)

    let obj = {}

    data.forEach((value, key) => obj[key] = value)
    fetch("/api/session/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            console.log("Logged in");
            if (json.success) {
                console.log(window.location.href);
                window.location.replace("http://localhost:8080/home")
                // window.location.replace("http://localhost:8080/errorRegister")
            } else {
                window.location.replace("http://localhost:8080/errorLogin")
            }
        })
        .catch((res) => {
            console.log(res);
            // window.location.replace("http://localhost:8080/errorLogin")
        }
        )
})