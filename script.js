const events = [
    { title: "Football Tournament", date: "2026-02-01", category: "Sports", description: "Inter-college football match" },
    { title: "AI Workshop", date: "2026-02-03", category: "Workshop", description: "Hands-on AI training" },
    { title: "Guest Lecture on Cybersecurity", date: "2026-02-05", category: "Lecture", description: "Expert talk by industry leader" },
    { title: "Basketball Finals", date: "2026-02-06", category: "Sports", description: "Final match" },
    { title: "Web Development Workshop", date: "2026-02-08", category: "Workshop", description: "Learn HTML, CSS, JS" },
    { title: "Motivational Talk", date: "2026-02-09", category: "Lecture", description: "Career guidance" }
];

let currentPage = 1;
const eventsPerPage = 5;

function displayEvents(list) {
    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";

    const start = (currentPage - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const pageEvents = list.slice(start, end);

    pageEvents.forEach(event => {
        container.innerHTML += `
            <div class="event-card">
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p>${event.description}</p>
                <button>View Details</button>
            </div>
        `;
    });

    document.getElementById("pageInfo").innerText =
        `Page ${currentPage} of ${Math.ceil(list.length / eventsPerPage)}`;
}

function filterEvents() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;

    let filtered = events.filter(e =>
        (e.title.toLowerCase().includes(search) || e.date.includes(search)) &&
        (category === "All" || e.category === category)
    );

    currentPage = 1;
    displayEvents(filtered);
}

document.getElementById("searchInput").addEventListener("input", filterEvents);
document.getElementById("categoryFilter").addEventListener("change", filterEvents);

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        filterEvents();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentPage++;
    filterEvents();
});

displayEvents(events);
// Tag each visible event card with correct event reference
function tagEventCards(list) {
    const cards = document.querySelectorAll(".event-card");
    cards.forEach((card, i) => {
        card.dataset.eventTitle = list[i].title;
        card.dataset.eventDate = list[i].date;
    });
}
