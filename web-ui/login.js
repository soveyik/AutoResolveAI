// login.js
// Handles frontend authentication routing by calling NestJS backend capabilities.
document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://127.0.0.1:3000/auth";

    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    const authError = document.getElementById("auth-error");

    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
        formLogin.style.display = "flex";
        formRegister.style.display = "none";
        authError.style.display = "none";
    });

    tabRegister.addEventListener("click", () => {
        tabRegister.classList.add("active");
        tabLogin.classList.remove("active");
        formRegister.style.display = "flex";
        formLogin.style.display = "none";
        authError.style.display = "none";
    });

    const showError = (msg) => {
        authError.textContent = msg;
        authError.style.display = "block";
    };

    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fullName = document.getElementById("reg-name").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password })
            });

            if (res.ok) {
                alert("Hesap başarıyla oluşturuldu! Lütfen giriş yapın.");
                tabLogin.click();
            } else {
                const err = await res.json();
                showError("Kayıt Hatası: " + (err.message || "Bilinmeyen bir hata oluştu"));
            }
        } catch (error) {
            showError("Ağ Hatası: Core API (Node.js) sunucusunun açık olduğundan emin olun.");
        }
    });

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("role", data.role);

                if (data.role === 'admin') {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "customer.html";
                }
            } else {
                showError("Giriş Başarısız: E-posta veya şifre hatalı!");
            }
        } catch (error) {
            showError("Ağ Hatası: Core API (Node.js) sunucusunun açık olduğundan emin olun.");
        }
    });
});
