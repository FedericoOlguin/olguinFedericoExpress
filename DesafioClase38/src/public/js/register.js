const form = document.getElementById('registerForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/session/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        if (!json.success) {
            window.location.replace("http://localhost:8080/errRegister")
        }
    })
        .finally(
            form.reset()
        )
})