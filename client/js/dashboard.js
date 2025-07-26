document.addEventListener("DOMContentLoaded", () => {
  const tripContainer = document.getElementById("dashboardTrips");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalItineraryText = document.getElementById("modalItineraryText");

  function loadTrips() {
    const trips = JSON.parse(localStorage.getItem("trips")) || [];

    if (trips.length === 0) {
      tripContainer.innerHTML = "<p>You have no saved trips yet.</p>";
      return;
    }

    tripContainer.innerHTML = "";

    trips.forEach((trip) => {
      const card = document.createElement("div");
      card.classList.add("trip-card");
      card.innerHTML = `
        <h3>${trip.destination}</h3>
        <p><strong>Days:</strong> ${trip.days}</p>
        <p><strong>Interests:</strong> ${trip.interests}</p>
        <button class="btn" onclick="viewItinerary(${trip.id})">View Itinerary</button>
        <button class="btn" onclick="deleteTrip(${trip.id})" style="margin-top: 10px;">Delete</button>
      `;
      tripContainer.appendChild(card);
    });
  }

  window.viewItinerary = function (id) {
    const trips = JSON.parse(localStorage.getItem("trips")) || [];
    const trip = trips.find((t) => t.id === id);

    if (trip) {
      modalItineraryText.textContent = trip.itinerary;
      modalOverlay.style.display = "flex";
    }
  };

  window.closeModal = function () {
    modalOverlay.style.display = "none";
  };

  window.deleteTrip = function (id) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips = trips.filter(trip => trip.id !== id);
    localStorage.setItem("trips", JSON.stringify(trips));
    loadTrips();
  };

  loadTrips();
});
