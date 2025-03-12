document.addEventListener("DOMContentLoaded", () => {
    const whiteBanner = document.getElementById("white-banner");
    const blackBanner = document.getElementById("black-banner");
    let black = `<div class="scroll-content">
                    <div class="logo-item">
                        <img src="Assets/Black Banner/t1.png" alt="Logo 1">
                    </div>
                    <div class="logo-item">
                        <img src="Assets/Black Banner/t2.png" alt="Logo 2">
                    </div>
                    <div class="logo-item">
                        <img src="Assets/Black Banner/t3.png" alt="Logo 3">
                    </div>
                </div>`;
    let white = `<div class="scroll-content">
                    <div class="logo-item">
                        <img src="Assets/White Banner/t1.png" alt="Logo 1">
                    </div>
                    <div class="logo-item">
                        <img src="Assets/White Banner/t2.png" alt="Logo 2">
                    </div>
                    <div class="logo-item">
                        <img src="Assets/White Banner/t3.png" alt="Logo 3">
                    </div>
                </div>`
    for (let i = 0; i < 3; i++) {
        whiteBanner.innerHTML += white;
        blackBanner.innerHTML += black;
    }

    const coordinators = document.getElementById('coordinator');
    const projectContainer = document.getElementById('projects');
    const searchInput = document.getElementById('projectSearch');
    const filterTags = document.querySelectorAll('.filter-tag');

    let projectsData = [];
    let activeCategory = 'all';
    let searchTerm = '';

    async function fetchData() {
        try {
            let response = await fetch('data.json');
            let data = await response.json();

            data.coordinator.forEach(person => {
                let coordinator = `<div class="coordinator-card fade-in">
                <img src="Assets/Coordinators/${person.img}" alt="Coordinator ${person.id}" class="coordinator-img">
                <div class="flex2">
                <h3>${person.name}</h3>
                <p>${person.designation}</p>
                <p>${person.department}</p>
                </div>
            </div>`;
                coordinators.innerHTML += coordinator;
            });

            projectsData = data.projects;
            renderProjects();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData();

    searchInput.addEventListener('input', function (e) {
        searchTerm = e.target.value.toLowerCase().trim();
        renderProjects();
    });

    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tag
            this.classList.add('active');

            // Update active category
            activeCategory = this.getAttribute('data-category');

            // Re-render projects
            renderProjects();
        });
    });

    function renderProjects() {
        // Clear current projects
        projectContainer.innerHTML = '';
    
        if (projectsData.length === 0) {
            return; // If data hasn't loaded yet, don't proceed
        }
    
        // Filter projects based on category and search term
        const filteredProjects = projectsData.filter(project => {
            // Check if project matches the active category (always treat category as array)
            const matchesCategory = activeCategory === 'all' || project.category.includes(activeCategory);
            
            // Check if project matches the search term
            const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                (project.detail && project.detail.toLowerCase().includes(searchTerm));
    
            return matchesCategory && matchesSearch;
        });
    
        // Create HTML for each project
        filteredProjects.forEach(project => {
            // Join array categories with spaces for the data-category attribute
            const categoryAttr = project.category.join(' ');
                
            let projectCard = `<div class="project-card fade-in" data-category="${categoryAttr}" data-id="${project.id}">
                <img src="Assets/${project.id}/${project.logo}" alt="Project ${project.id}" class="project-img">
                <div class="project-caption">
                    <h3>${project.title}</h3>
                </div>
            </div>`;
            projectContainer.innerHTML += projectCard;
        });
    }

    // Add a single event listener to the container using event delegation
    projectContainer.addEventListener('click', (event) => {
        // Find the closest parent project-card element
        const projectCard = event.target.closest('.project-card');

        // If a project card was clicked (or something inside it)
        if (projectCard) {
            // Get the project ID or any other data you need to pass
            const projectId = projectCard.getAttribute('data-id') || projectCard.dataset.category;

            // Navigate to project.html with query parameter
            window.location.href = `project.html?id=${projectId}`;
        }
    });

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
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;
    const icon = themeToggle.querySelector("i");

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        icon.classList.toggle("fa-moon");
        icon.classList.toggle("fa-sun");
    });

    // Carousel Animation
    document.addEventListener("DOMContentLoaded", () => {
        const track = document.querySelector(".carousel-track");

        // Function to handle the infinite scroll effect
        function resetAnimation() {
            track.style.animation = "none";
            track.offsetHeight; // Trigger reflow
            track.style.animation = "carousel 10s linear infinite";
        }

        // Reset animation when it completes
        track.addEventListener("animationend", resetAnimation);
    });

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    fadeElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        observer.observe(element);
    });

    
    // Add floating label animation for each input
    document.querySelectorAll(".form-input").forEach((input) => {
        input.addEventListener("focus", () => {
            input.parentElement.classList.add("focused");
        });

        input.addEventListener("blur", () => {
            if (!input.value) {
                input.parentElement.classList.remove("focused");
            }
        });
    });
    const gallery = document.getElementById("gallery")
    const imageCount = 8;
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
