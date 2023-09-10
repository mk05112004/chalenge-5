document.getElementById("loginForm").addEventListener("submit",  async(e) =>{
    e.preventDefault();
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
        //made a post request to check if the email and password are true and exist
        const response = await fetch("http://localhost:8080/auth/check" , {
            method : "POST" ,
            headers : {
                "Content-type" : "application/json" 
            },
            body : JSON.stringify({email , password}) 
        })
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            window.location.href = "../home.html"
        }else {
            if (data.emailError) {
                alert("Email Not Found")
            } else if (data.passwordError) 
                alert("incorrect password")
            
        }
    } catch (error) {
        console.log("error : "+ error.message)
    }
});