const form = document.getElementById("formLogIn")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = new FormData(form)

    let obj = {}

    data.forEach((value, key) => obj[key] = value)
    // console.log(obj);
    fetch("api/session/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            if (res.success) {
                console.log("todo piola");
                console.log(window.location.href);
                window.location.replace("http://localhost:8080/")
                // location.href = "http://localhost:8080/current"
            }
        })
})
