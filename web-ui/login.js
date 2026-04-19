// login.js
// Authentication routing abstraction
document.addEventListener("DOMContentLoaded", () => {
    const btnCustomer = document.getElementById("btn-customer");
    const btnAdmin = document.getElementById("btn-admin");
    const adminPassContainer = document.getElementById("admin-pass-container");
    const adminPasswordInput = document.getElementById("admin-password");
    const btnAdminLogin = document.getElementById("btn-admin-login");

    btnCustomer.addEventListener("click", () => {
        localStorage.setItem("role", "customer");
        window.location.href = "customer.html";
    });

    btnAdmin.addEventListener("click", () => {
        btnAdmin.style.display = "none";
        adminPassContainer.style.display = "flex";
    });

    btnAdminLogin.addEventListener("click", () => {
        const password = adminPasswordInput.value;
        if (password === "123456") {
            localStorage.setItem("role", "admin");
            window.location.href = "admin.html";
        } else {
            alert("Invalid Credentials");
            adminPasswordInput.value = "";
        }
    });
});
