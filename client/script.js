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
            body: JSON.stringify({ url: originalURL }),
        });

        if (response.ok) {
            const data = await response.json(); // Parse the response JSON
            const uniqueDiv = document.createElement("div");
                uniqueDiv.innerHTML= `
                <div class="full">
                <p>Full Url : </p>
                <a href="${url.fullUrl}"> ${url.fullUrl} </a>
                </div>
                <div class="short">
                <p>Short Url : </p>
                <a href="${url.fullUrl}"> ${url.shortUrl} </a>
                </div>

                `
                allUrl.appendChild(uniqueDiv);
        } else {
            console.log("Error");
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

(async function () {
    try {
        const response = await fetch("http://localhost:8080/api/data");
        
        if (response.ok) {
            const data = await response.json(); // Parse the response JSON

            data.url.forEach(url => {
                const uniqueDiv = document.createElement("div");
                uniqueDiv.className = "OneUrl";

                uniqueDiv.innerHTML= `
                <div class="full">
                <p>Full Url : </p>
                <a href="${url.fullUrl}"> ${url.fullUrl} </a>
                </div>
                <div class="short">
                <p>Short Url : </p>
                <a href="${url.fullUrl}"> ${url.shortUrl} </a>
                </div>

                `
                allUrl.appendChild(uniqueDiv);
            });
        }
    } catch (error) {
        console.log(error.message);
    }
})();
