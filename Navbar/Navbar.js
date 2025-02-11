document.addEventListener("DOMContentLoaded", function () {
    fetch("../Navbar/Navbar.html") 
        .then(response => response.text())
        .then(data => {
            const navbarPlaceholder = document.getElementById("navbar-placeholder");
            navbarPlaceholder.innerHTML = data;

            // Attach hamburger menu functionality after the navbar is loaded
            attachHamburgerMenuListener();
        })
        .catch(error => console.error("Error loading navbar:", error));
});

// Function to attach event listeners to the hamburger menu
function attachHamburgerMenuListener() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (hamburgerMenu && mobileMenu) {
        console.log("Hamburger menu found. Adding event listener.");

        // Toggle mobile menu on hamburger click
        hamburgerMenu.addEventListener("click", function () {
            console.log("Hamburger menu clicked!");
            mobileMenu.classList.toggle("show");
        });

        // Close the menu when resizing beyond 768px
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                console.log("Screen resized, hiding mobile menu.");
                mobileMenu.classList.remove("show");
            }
        });
    } else {
        console.error("Hamburger menu or mobile menu not found.");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Check if the favicon is already present
    if (!document.querySelector('link[rel="icon"]')) {
        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = "https://i.imgur.com/YXXdLF8.png"; // Change URL if needed
        favicon.type = "image/x-icon";
        document.head.appendChild(favicon);
    }
});

