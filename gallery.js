document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
    const gallery = document.getElementById("gallery")
    const imageCount = 72;
    for (let i = 1; i <= imageCount; i++) {
        let img = `<div class="gallery-item">
                <img src="Assets/Gallery/${i}.jpg" alt="Image ${i}">
            </div>`
        gallery.innerHTML += img;
    }
    // Variables
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentIndex = 0;

    // Apply initial animations with delay
    galleryItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightboxImage.src = img.src;
            lightbox.classList.add('active');
            currentIndex = index;
        });
    });

    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
        
        // Navigate with arrow keys
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
            if (e.key === 'ArrowRight') navigateLightbox('next');
        }
    });

    // Navigation buttons
    lightboxPrev.addEventListener('click', function() {
        navigateLightbox('prev');
    });

    lightboxNext.addEventListener('click', function() {
        navigateLightbox('next');
    });

    function navigateLightbox(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        } else {
            currentIndex = (currentIndex + 1) % galleryItems.length;
        }
        
        const newItem = galleryItems[currentIndex];
        const img = newItem.querySelector('img');
        
        // Add fade animation
        lightboxImage.style.opacity = 0;
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.style.opacity = 1;
        }, 200);
    }

    // Click outside content to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // Handle image loading
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.add('loaded');
        });
    });
});