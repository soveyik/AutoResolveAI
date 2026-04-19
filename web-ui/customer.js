// customer.js
// Handles ticket form submission logic
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("role") !== "customer") {
        window.location.href = "index.html";
    }

    const API_URL = "http://localhost:3000/tickets";
    const form = document.getElementById("ticket-form");
    const submitBtn = document.getElementById("submit-btn");
    const successMsg = document.getElementById("success-msg");
    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
        successMsg.style.display = "none";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }) 
            });

            if (response.ok) {
                form.reset();
                successMsg.style.display = "block";
                setTimeout(() => { successMsg.style.display = "none"; }, 3000);
            }
        } catch (error) {
            alert("Error submitting ticket.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Ticket";
        }
    });
});
