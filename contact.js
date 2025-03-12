document.addEventListener("DOMContentLoaded", () => {
    // Contact Form
    document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            const button = this.querySelector(".submit-btn");
            const icon = button.querySelector(".btn-icon");

            // Add loading state
            button.classList.add("loading");

            // Simulate form submission
            setTimeout(() => {
                button.classList.remove("loading");
                button.classList.add("success");
                icon.innerHTML = '<i class="fas fa-check"></i>';

                // Reset form and button after delay
                setTimeout(() => {
                    this.reset();
                    button.classList.remove("success");
                    icon.innerHTML = '<i class="fas fa-paper-plane"></i>';

                    // Shake animation for success feedback
                    button.style.animation = "shake 0.5s ease";
                    setTimeout(() => {
                        button.style.animation = "";
                    }, 500);
                }, 2000);
            }, 1500);
        });
});
