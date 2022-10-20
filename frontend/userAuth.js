async function hashString(text){
    const textAsBuffer = new TextEncoder().encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function validateUsername(username){
    return /[A-Za-z0-9\._-]{3,}/.test(username)   
}

function validatePassword(password){
    if (password.length < 5 || password.toLowerCase().indexOf("password") === 0){
        return false
    }
    return true
}

async function createUser(){
    let username = document.forms[0].username.value;
    if (!validateUsername(username)){
        document.getElementById("status").innerHTML = 
            "Invalid username. Username must be 3 or more alphanumeric characters";
            return
    }
    let password = document.forms[0].password.value;
    if (!validatePassword(password)){
        document.getElementById("status").innerHTML = 
            "Invalid password. Password must be 5 or more characters and MUST NOT START WITH 'password'";
            return
    }
    const salt = Math.random().toString().replace("0.", "")
    password = password + salt
    hashString(password).then(passwordHash => {
        fetch(`http://localhost:3000/createUser?u=${username}&ph=${passwordHash}&s=${salt}`)
        .then(response => {
            response.text().then(response => {
                response = JSON.parse(response)
                document.getElementById("status").innerHTML = "Status: " + response.status
                sessionStorage.token = response.token;
            })
        })
    })
}

async function loginUser(){
    let username = document.forms[0].username.value;
    if (!validateUsername(username)){
        document.getElementById("status").innerHTML = 
            "Invalid username. Username must be 3 or more alphanumeric characters";
            return
    }
    fetch(`http://localhost:3000/userSalt?u=${username}`).then(response => {
        response.text().then(text => {
            hashString(document.forms[0].password.value + text.toString()).then(ph => {
                fetch(`http://localhost:3000/loginUser?u=${username}&ph=${ph}`).then(response => {
                    response.text().then(text => {
                        let result = JSON.parse(text)
                        sessionStorage.setItem("token", result.token)
                        document.getElementById("status").innerHTML = (
                            "Status: " + result.status
                            + `<br /><a href='./evilBooks?token=${result.token}'>`
                            + "Check out our members only collection of evil books</a>"
                        )
                    })
                })
            })
        })
    })
}
