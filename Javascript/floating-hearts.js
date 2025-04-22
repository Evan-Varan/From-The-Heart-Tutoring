document.addEventListener('DOMContentLoaded', function() {
    // Initial placement of hearts
    placeHeartsInHeroSections();
    
    // Update hearts when window is resized
    let resizeTimer;
    window.addEventListener('resize', function() {
        // Clear previous timer
        clearTimeout(resizeTimer);
        
        // Set new timer to avoid excessive updates during resize
        resizeTimer = setTimeout(function() {
            // Remove all existing hearts
            document.querySelectorAll('.hearts-container').forEach(container => {
                container.remove();
            });
            
            // Place new hearts with updated boundaries
            placeHeartsInHeroSections();
        }, 300);
    });
    
    function placeHeartsInHeroSections() {
        // Wait a short time to ensure the navbar and content are fully rendered
        setTimeout(function() {
            // Find all hero sections
            const heroSections = document.querySelectorAll('.hero-section');
            
            // Get navbar height from the actual navbar element
            let navbarHeight = 60; // Default navbar height in pixels
            
            // Try to get the actual navbar element
            const navbar = document.querySelector('.navbar') || 
                          document.querySelector('#navbar') || 
                          document.querySelector('nav') || 
                          document.querySelector('#navbar-placeholder');
            
            if (navbar) {
                // Get the actual height including any borders/padding
                navbarHeight = navbar.offsetHeight;
                console.log("Detected navbar height:", navbarHeight);
            } else {
                console.log("Using default navbar height:", navbarHeight);
            }
            
            // Check if we're on a mobile device
            const isMobile = window.innerWidth < 768;
            console.log("Is mobile device:", isMobile);
            
            // For each hero section, add floating hearts
            heroSections.forEach(section => {
                // Create a container for hearts to ensure they stay within bounds
                const heartsContainer = document.createElement('div');
                heartsContainer.className = 'hearts-container';
                section.appendChild(heartsContainer);
                
                // Get section dimensions and position
                const sectionRect = section.getBoundingClientRect();
                const sectionHeight = sectionRect.height;
                const sectionWidth = sectionRect.width;
                
                // Get the hero content element to create a safe zone around it
                const heroContent = section.querySelector('.hero-content');
                let contentSafeZone = null;
                
                if (heroContent) {
                    // Force a reflow to ensure we get the latest dimensions
                    void heroContent.offsetHeight;
                    
                    const contentRect = heroContent.getBoundingClientRect();
                    
                    // Calculate content safe zone in percentages relative to the section
                    // Use a moderate buffer to avoid direct overlap with text
                    const safeZoneBuffer = isMobile ? 8 : 5;
                    
                    contentSafeZone = {
                        left: ((contentRect.left - sectionRect.left) / sectionRect.width) * 100 - safeZoneBuffer,
                        right: ((contentRect.right - sectionRect.left) / sectionRect.width) * 100 + safeZoneBuffer,
                        top: ((contentRect.top - sectionRect.top) / sectionRect.height) * 100 - safeZoneBuffer,
                        bottom: ((contentRect.bottom - sectionRect.top) / sectionRect.height) * 100 + safeZoneBuffer
                    };
                    
                    console.log("Content safe zone:", contentSafeZone);
                }
                
                // Calculate the top safe zone to avoid navbar
                const sectionTop = sectionRect.top;
                const viewportOverlap = Math.max(0, navbarHeight - sectionTop);
                const navbarSafeZonePercentage = (viewportOverlap / sectionHeight) * 100;
                
                // Add a buffer to the navbar safe zone
                const topSafeZone = navbarSafeZonePercentage + 2; // 2% buffer
                
                console.log("Section dimensions:", sectionWidth, "x", sectionHeight);
                console.log("Navbar safe zone percentage:", navbarSafeZonePercentage);
                
                // Array to keep track of placed hearts for collision detection
                const placedHearts = [];
                
                // Adjust heart count based on screen size
                const maxHearts = isMobile ? 20 : 25; // Slightly fewer hearts on mobile
                const maxAttempts = 200;
                
                // Create a grid of potential positions covering the entire hero section
                const gridPositions = [];
                const gridStepX = isMobile ? 8 : 5; // Slightly larger steps on mobile
                const gridStepY = isMobile ? 8 : 5;
                
                // Create a full grid for both mobile and desktop
                for (let x = 5; x <= 95; x += gridStepX) {
                    for (let y = Math.max(topSafeZone, 5); y <= 85; y += gridStepY) {
                        gridPositions.push({ x, y });
                    }
                }
                
                // Filter out positions that overlap with content
                const safePositions = gridPositions.filter(pos => {
                    if (!contentSafeZone) return true;
                    
                    return !(pos.x > contentSafeZone.left && 
                             pos.x < contentSafeZone.right && 
                             pos.y > contentSafeZone.top && 
                             pos.y < contentSafeZone.bottom);
                });
                
                console.log(`Found ${safePositions.length} safe positions out of ${gridPositions.length} total positions`);
                
                // Shuffle the safe positions
                shuffleArray(safePositions);
                
                // Place hearts at safe positions
                let heartsPlaced = 0;
                
                // First phase: Place hearts at pre-calculated safe positions
                for (let i = 0; i < Math.min(safePositions.length, maxHearts); i++) {
                    const pos = safePositions[i];
                    const size = isMobile ? 
                                 (Math.random() * 10 + 8) : // 8-18px on mobile
                                 (Math.random() * 15 + 10); // 10-25px on desktop
                    
                    // Check for collision with existing hearts
                    let hasCollision = false;
                    for (const heart of placedHearts) {
                        const distance = Math.sqrt(
                            Math.pow(pos.x - heart.x, 2) + 
                            Math.pow(pos.y - heart.y, 2)
                        );
                        
                        // Collision distance based on device
                        const collisionDistance = isMobile ? 
                                                 (size/2 + heart.size/2 + 2) : // Smaller on mobile
                                                 (size/2 + heart.size/2 + 3);
                        
                        if (distance < collisionDistance) {
                            hasCollision = true;
                            break;
                        }
                    }
                    
                    // If no collision, place the heart
                    if (!hasCollision) {
                        createFloatingHeart(heartsContainer, pos.x, pos.y, size, isMobile);
                        placedHearts.push({ x: pos.x, y: pos.y, size: size });
                        heartsPlaced++;
                        
                        // Stop if we've placed enough hearts
                        if (heartsPlaced >= maxHearts) break;
                    }
                }
                
                // Second phase: Try random positions to fill in gaps
                let attempts = 0;
                while (heartsPlaced < maxHearts && attempts < maxAttempts) {
                    attempts++;
                    
                    // Generate random position
                    const size = isMobile ? 
                               (Math.random() * 8 + 6) : // 6-14px on mobile
                               (Math.random() * 10 + 8); // 8-18px on desktop
                    const posX = Math.random() * 90 + 5; // Random X position (5-95%)
                    
                    // Limit Y position to avoid navbar and bottom area
                    const minY = Math.max(topSafeZone, 5); // At least 5% from the top
                    const maxY = 85; // Maximum 85% down the section
                    const posY = minY + (Math.random() * (maxY - minY));
                    
                    // Skip if we're in the content safe zone
                    if (contentSafeZone) {
                        if (posX > contentSafeZone.left && posX < contentSafeZone.right && 
                            posY > contentSafeZone.top && posY < contentSafeZone.bottom) {
                            continue; // Skip this position, it's in the content safe zone
                        }
                    }
                    
                    // Check for collision with existing hearts
                    let hasCollision = false;
                    for (const heart of placedHearts) {
                        const distance = Math.sqrt(
                            Math.pow(posX - heart.x, 2) + 
                            Math.pow(posY - heart.y, 2)
                        );
                        
                        // Reduced collision distance for second phase
                        const collisionDistance = isMobile ? 
                                               (size/2 + heart.size/2 + 1) : // Very small on mobile
                                               (size/2 + heart.size/2 + 2);
                        
                        if (distance < collisionDistance) {
                            hasCollision = true;
                            break;
                        }
                    }
                    
                    // If no collision, place the heart
                    if (!hasCollision) {
                        createFloatingHeart(heartsContainer, posX, posY, size, isMobile);
                        placedHearts.push({ x: posX, y: posY, size: size });
                        heartsPlaced++;
                    }
                }
                
                console.log(`Placed ${heartsPlaced} hearts in the hero section`);
            });
        }, 300); // Wait 300ms for everything to be fully rendered
    }
    
    // Helper function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function createFloatingHeart(parent, posX, posY, size, isMobile) {
        // Create SVG heart element
        const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        heart.classList.add('floating-heart');
        heart.setAttribute('viewBox', '0 0 24 24');
        heart.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
        // Create path for the heart shape
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z');
        
        // Calculate animation properties
        const duration = isMobile ? 
                        (Math.random() * 8 + 17) : // 17-25s on mobile (slower)
                        (Math.random() * 10 + 15); // 15-25s on desktop
        const delay = Math.random() * 10; // Random delay between 0-10s
        
        // Smaller movements on mobile
        const movementScale = isMobile ? 0.7 : 1;
        const maxDownwardMovement = Math.max(3, 15 - (posY / 5)) * movementScale;
        const upwardMovement = (Math.random() * 15 + 10) * movementScale;
        const horizontalMovement = (Math.random() * 15 + 5) * movementScale;
        
        // Set heart styles
        heart.style.position = 'absolute';
        heart.style.left = `${posX}%`;
        heart.style.top = `${posY}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        
        // Create custom animation for this heart
        const animationName = `float-${Math.floor(Math.random() * 10000)}`;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${animationName} {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${horizontalMovement}px, -${upwardMovement}px) rotate(${Math.random() * 10}deg); }
                50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${horizontalMovement * 0.5}px, -${upwardMovement * 0.7}px) rotate(${Math.random() * 15}deg); }
                75% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${horizontalMovement * 0.8}px, -${maxDownwardMovement}px) rotate(${Math.random() * 5}deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Apply the custom animation
        heart.style.animation = `${animationName} ${duration}s ease-in-out ${delay}s infinite`;
        
        // Set heart color - various shades of red with transparency
        const red = 255;
        const green = Math.floor(Math.random() * 50) + 50; // 50-100
        const blue = Math.floor(Math.random() * 50) + 50; // 50-100
        const alpha = isMobile ? 
                     (Math.random() * 0.2 + 0.15) : // 0.15-0.35 on mobile
                     (Math.random() * 0.2 + 0.1);   // 0.1-0.3 on desktop
        
        path.style.fill = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        
        // Add path to heart and heart to parent
        heart.appendChild(path);
        parent.appendChild(heart);
    }
});