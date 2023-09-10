document.getElementById("registrationForm").addEventListener("submit", async(e)=> {
    e.preventDefault()
    const email = document.getElementById("username");
    const password = document.getElementById("password");

    try {
        const response = await fetch("http://localhost:8080/auth/create" , {
            method : 'POST' ,
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({email : email.value ,password : password.value})
        })
        if (response.ok) {
                window.location.href = "./index.html"
        }else  {
            const data = await response.json()
            if (data.error) {
                alert(`This account is already in use`);
            }
        }
    } catch (error) {
        console.log(error)
    }
    
    
});