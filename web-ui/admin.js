// admin.js
// Handles fetching and displaying global support tickets
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("role") !== "admin") {
        window.location.href = "index.html";
    }

    const API_URL = "http://127.0.0.1:3000/tickets";
    const refreshBtn = document.getElementById("refresh-btn");
    const ticketList = document.getElementById("ticket-list");
    const ticketCount = document.getElementById("ticket-count");
    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });

    async function fetchTickets() {
        try {
            const response = await fetch(API_URL);
            const tickets = await response.json();

            ticketList.innerHTML = "";
            ticketCount.textContent = tickets.length;

            if (tickets.length === 0) {
                ticketList.innerHTML = '<p style="text-align:center;">Bekleyen bilet bulunmuyor.</p>';
                return;
            }

            tickets.reverse().forEach(ticket => {
                const li = document.createElement("li");
                
                const isUrgent = ticket.priority === 'URGENT';
                const cardClass = isUrgent ? 'urgency-high' : 'urgency-normal';
                const badgeClass = isUrgent ? 'badge-urgent' : 'badge-normal';
                const badgeText = ticket.priority;

                li.className = `ticket-card ${cardClass}`;
                li.innerHTML = `
                    <div class="card-header">
                        <h3>${ticket.title}</h3>
                        <span class="badge ${badgeClass}">${badgeText}</span>
                    </div>
                    <p class="card-body">"${ticket.description}"</p>
                    <div class="card-footer">
                        <span>Bilet No: #${ticket.id.slice(0, 8)}</span>
                        <span>Tarih: ${new Date(ticket.createdAt).toLocaleString()}</span>
                    </div>
                `;
                ticketList.appendChild(li);
            });
        } catch (error) {
            ticketList.innerHTML = '<p style="color: red; text-align: center;">Biletler yüklenirken ağ hatası oluştu.</p>';
        }
    }

    refreshBtn.addEventListener("click", fetchTickets);
    fetchTickets();
});
