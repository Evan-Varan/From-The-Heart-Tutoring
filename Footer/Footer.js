// Footer.js
document.addEventListener("DOMContentLoaded", function() {
    // Get the footer placeholder
    const footerPlaceholder = document.getElementById("footer-placeholder");
    
    if (footerPlaceholder) {
        // Create a request to load the footer HTML
        fetch("../Footer/Footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load footer");
                }
                return response.text();
            })
            .then(html => {
                // Insert the footer HTML
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error("Error loading footer:", error);
            });
    }
});