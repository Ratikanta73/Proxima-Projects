document.addEventListener("DOMContentLoaded", () => {
    // Contact Form
    const form = document.getElementById("contactForm");
    
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const button = this.querySelector(".submit-btn");
            const icon = button.querySelector(".btn-icon");
            const formData = new FormData(this);
            
            // Add loading state
            button.classList.add("loading");
            icon.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            
            // Actually submit the form to Formspree
            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(data => {
                // Success state
                button.classList.remove("loading");
                button.classList.add("success");
                icon.innerHTML = '<i class="fas fa-check"></i>';
                
                // Show success message
                showMessage("Your message has been sent successfully!", "success");
                
                // Reset form and button after delay
                setTimeout(() => {
                    form.reset();
                    button.classList.remove("success");
                    icon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    
                    // Shake animation for success feedback
                    button.style.animation = "shake 0.5s ease";
                    setTimeout(() => {
                        button.style.animation = "";
                    }, 500);
                }, 2000);
            })
            .catch(error => {
                // Error state
                button.classList.remove("loading");
                button.classList.add("error");
                icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                
                // Show error message
                showMessage("Oops! There was a problem sending your message.", "error");
                
                console.error("Error:", error);
                
                // Reset button after delay
                setTimeout(() => {
                    button.classList.remove("error");
                    icon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                }, 2000);
            });
        });
    }
    
    // Function to show messages
    function showMessage(text, type) {
        // Remove any existing message
        const existingMessage = document.querySelector(".form-message");
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const message = document.createElement("div");
        message.className = `form-message form-message-${type}`;
        message.textContent = text;
        
        // Add message after form
        form.parentNode.insertBefore(message, form.nextSibling);
        
        // Remove message after some time
        setTimeout(() => {
            message.classList.add("form-message-fadeout");
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    }
});