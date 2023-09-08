document.addEventListener("DOMContentLoaded", function () {
    const shortenBtn = document.getElementById("shortenBtn");
    const originalUrlInput = document.getElementById("originalUrl");
    const shortUrlSpan = document.getElementById("shortUrl");

    shortenBtn.addEventListener("click", async () => {
        const originalUrl = originalUrlInput.value;

        try {
            const response = await fetch("/api/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ originalUrl }),
            });

            if (response.ok) {
                const data = await response.json();
                shortUrlSpan.textContent = data.shortUrl;
            } else {
                console.error("Failed to shorten URL");
            }
        } catch (error) {
            console.error(error);
        }
    });
});
