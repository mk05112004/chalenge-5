const urlForm = document.getElementById('urlForm');
const originalURLInput = document.getElementById('originalURL');
const shortcutURLDisplay = document.getElementById('shortcutURL');
const allUrl = document.querySelector(".All-url");

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originalURL = originalURLInput.value;
    try {
        const response = await fetch("http://localhost:8080/api/shorten", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: originalURL}),
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
});

(
    async function () {
        try {

            //get the data of specific user from vd
            const response = await fetch("http://localhost:8080/api/data");

            if (response.ok) {
                const data = await response.json();
                console.log(data)

                data.url.sites.forEach(url => {
                    
                        const uniqueDiv = document.createElement("div");
                    uniqueDiv.className = "OneUrl";
                    uniqueDiv.innerHTML = `
                        <div class="full">
                            <p>Full Url : </p>
                            <a href="${url.fullUrl}"> ${url.fullUrl}</a>
                        </div>
                        <div class="short">
                            <p>Short Url : </p>
                                <p class="shortUrlText" onClick="shortUrlPath('${url.shortUrl}')"> ${url.shortUrl}</p>
                        </div>
                    `;
                    allUrl.appendChild(uniqueDiv);

             })
                    
            }else {
                const data = await response.json();
                console.log(data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
)();

const shortUrlPath =async(shortPath)=>{
    console.log("work")
    try {
       const response = await fetch("http://localhost:8080/api/"+shortPath)
       if (response.ok) {
        const data = await response.json() 
       }else {
        console.log("error")
       }
    
    } catch (error) {
        
    }
    

}