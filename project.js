document.addEventListener('DOMContentLoaded', function () {
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

    // Animation for elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    if (projectId) {
        loadProjectDetails(projectId);
    } else {
        console.error('No project ID provided');
    }

    function loadProjectDetails(id) {
        // Fetch your project data from wherever you store it
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Find the project with the matching ID
                const project = data.projects.find(p => p.id.toString() === id || p.category === id);

                if (project) {
                    // Update the DOM with project details
                    document.title = `${project.title}`;
                    document.getElementById('project-title').textContent = project.title;
                    document.getElementById('project-description').textContent = project.description;
                    project.technologies.forEach(technology => {
                        const techElement = `<div class="tech-tag">${technology}</div>`;
                        document.getElementById('project-technologies').innerHTML += techElement;
                    })
                    document.getElementById('project-video').src = `${project.video}`
                    project.gallery.forEach(image => {
                        const imageElement = `<div class="gallery-item">
                        <img src="Assets/${project.id}/${image.image}" alt="Project Image ${image.id}">
                        </div>`;
                        document.getElementById('project-gallery').innerHTML += imageElement;
                    })
                    project.developers.forEach(developer => {
                        const developerElement = `<div class="developer-card">
                <img src="Assets/${project.id}/${developer.image}" alt="Developer ${developer.id}" class="developer-img">
                <h3 class="developer-name">${developer.name}</h3>
                <p class="developer-role">${developer.role}</p>
            </div>`;
                        document.getElementById('project-developers').innerHTML += developerElement;
                    })

                }
                else {
                    console.error('Project not found');
                    // Handle project not found case
                }
            })
            .catch(error => console.error('Error loading project details:', error));
    }
});