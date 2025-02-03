document.addEventListener("DOMContentLoaded", function () {
    const navbarRight = document.querySelector(".navbar-right");
    const navbarDropdown2 = document.querySelector(".navbar-dropdown2");

    function checkScreenSize() {
        if (window.innerWidth <= 1305) {
            navbarRight.style.display = "none"; // Hide navbar-right
            navbarDropdown2.style.display = "flex"; // Show menu button
        } else {
            navbarRight.style.display = "flex"; // Show navbar-right
            navbarDropdown2.style.display = "none"; // Hide menu button
        }
    }

    // Run check on load
    checkScreenSize();

    // Listen for window resize events
    window.addEventListener("resize", checkScreenSize);
});
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (hamburgerMenu && mobileMenu) {
        console.log("Hamburger menu and mobile menu found. Adding event listener.");

        hamburgerMenu.addEventListener("click", function () {
            console.log("Hamburger menu clicked!");
            mobileMenu.classList.toggle("show"); // Toggle the 'show' class
        });
    } else {
        console.error("Hamburger menu or mobile menu not found.");
    }
});




