document.addEventListener("DOMContentLoaded", function() {
    // Load navbar content
    fetch("../Navbar/Navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            
            // Initialize navbar functionality
            initNavbar();
            
            // Highlight current page
            highlightCurrentPage();
        })
        .catch(error => console.error("Error loading navbar:", error));
    
    // Add favicon if not present
    if (!document.querySelector('link[rel="icon"]')) {
        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = "https://i.imgur.com/YXXdLF8.png";
        favicon.type = "image/x-icon";
        document.head.appendChild(favicon);
    }
});

function initNavbar() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", function() {
            mobileToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            
            // Prevent body scrolling when menu is open
            if (mobileMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });
    }
    
    // Close mobile menu on window resize
    window.addEventListener("resize", function() {
        if (window.innerWidth > 900 && mobileMenu && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            if (mobileToggle) mobileToggle.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
    
    // Navbar scroll effect
    window.addEventListener("scroll", function() {
        const header = document.querySelector(".header");
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });
    
    // Add hover effect for nav items
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
            const indicator = this.querySelector(".nav-indicator");
            if (indicator) {
                indicator.style.width = "70%";
            }
        });
        
        item.addEventListener("mouseleave", function() {
            if (!this.classList.contains("active")) {
                const indicator = this.querySelector(".nav-indicator");
                if (indicator) {
                    indicator.style.width = "0";
                }
            }
        });
    });
    
    // Add click event for mobile links
    const mobileLinks = document.querySelectorAll(".mobile-link");
    mobileLinks.forEach(link => {
        link.addEventListener("click", function() {
            if (mobileMenu) mobileMenu.classList.remove("active");
            if (mobileToggle) mobileToggle.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
}

function highlightCurrentPage() {
    // Get current page path
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop().split(".")[0].toLowerCase();
    
    // Special case for ScheduleNowServices folder - always highlight "Schedule Now"
    if (currentPath.includes("ScheduleNowServices")) {
        highlightSpecificNavItem("welcome");
        return;
    }
    
    // Find all navigation items
    const navItems = document.querySelectorAll(".nav-item");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const dropdownLinks = document.querySelectorAll(".dropdown-link");
    
    // Highlight desktop nav items
    navItems.forEach(item => {
        const page = item.getAttribute("data-page");
        if (page && (pageName === page.toLowerCase() || currentPath.toLowerCase().includes(page.toLowerCase()))) {
            item.classList.add("active");
        }
    });
    
    // Highlight mobile links
    mobileLinks.forEach(link => {
        const page = link.getAttribute("data-page");
        if (page && (pageName === page.toLowerCase() || currentPath.toLowerCase().includes(page.toLowerCase()))) {
            link.classList.add("active");
        }
    });
    
    // Highlight dropdown links
    dropdownLinks.forEach(link => {
        const page = link.getAttribute("data-page");
        if (page && (pageName === page.toLowerCase() || currentPath.toLowerCase().includes(page.toLowerCase()))) {
            link.classList.add("active");
            
            // Also highlight parent dropdown
            const parentDropdown = link.closest(".dropdown");
            if (parentDropdown) {
                parentDropdown.classList.add("active");
            }
        }
    });
}

// Helper function to highlight a specific nav item by data-page value
function highlightSpecificNavItem(dataPageValue) {
    // First, remove active class from all items
    document.querySelectorAll(".nav-item, .mobile-link, .dropdown-link").forEach(item => {
        item.classList.remove("active");
    });
    
    // Highlight desktop nav item
    const navItem = document.querySelector(`.nav-item[data-page="${dataPageValue}"]`);
    if (navItem) {
        navItem.classList.add("active");
    }
    
    // Highlight mobile link
    const mobileLink = document.querySelector(`.mobile-link[data-page="${dataPageValue}"]`);
    if (mobileLink) {
        mobileLink.classList.add("active");
    }
    
    // Highlight dropdown link if applicable
    const dropdownLink = document.querySelector(`.dropdown-link[data-page="${dataPageValue}"]`);
    if (dropdownLink) {
        dropdownLink.classList.add("active");
        
        // Also highlight parent dropdown
        const parentDropdown = dropdownLink.closest(".dropdown");
        if (parentDropdown) {
            parentDropdown.classList.add("active");
        }
    }
}

// Add smooth scrolling for anchor links
document.addEventListener("click", function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const id = target.getAttribute("href").substring(1);
        const element = document.getElementById(id);
        
        if (element) {
            const headerHeight = document.querySelector(".header").offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }
});