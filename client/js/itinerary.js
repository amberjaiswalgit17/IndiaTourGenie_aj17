// itinerary.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("itineraryForm");
  const display = document.getElementById("itineraryDetails");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ref = document.getElementById("referenceCode").value.trim().toUpperCase();
    const trips = JSON.parse(localStorage.getItem("trips")) || [];

    if (!ref) {
      display.innerHTML = "<p>Please enter a reference code.</p>";
      return;
    }

    // Simulate reference match based on trip timestamp encoding
    const trip = trips.find(trip => ref === getRefFromId(trip.id));

    if (!trip) {
      display.innerHTML = "<p>No itinerary found with this reference code.</p>";
      return;
    }

    display.innerHTML = `
      <div class="itinerary-card">
        <h3>Your Trip to ${trip.destination}</h3>
        <p><strong>Duration:</strong> ${trip.days} days</p>
        <p><strong>Interests:</strong> ${trip.interests}</p>
        <p><strong>Reference Code:</strong> ${ref}</p>
        <button class="btn" onclick="window.print()">🖨️ Print</button>
      </div>
    `;
  });

  function getRefFromId(id) {
    return id ? id.toString(36).substring(0, 6).toUpperCase() : "";
  }
});
