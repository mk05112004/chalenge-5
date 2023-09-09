const urlForm = document.getElementById('urlForm');
const originalURLInput = document.getElementById('originalURL');
const shortcutURLDisplay = document.getElementById('shortcutURL');

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalURL = originalURLInput.value;

    try {
        // Send the original URL to your backend to generate a shortcut URL
        const response = await fetch('/api/generateShortcut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ originalURL }),
        });

        if (response.ok) {
            const data = await response.json();
            shortcutURLDisplay.innerHTML = `Shortcut URL: <a href="${data.shortcutURL}" target="_blank">${data.shortcutURL}</a>`;
        } else {
            // Handle errors here
            console.error('Error generating shortcut URL');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
