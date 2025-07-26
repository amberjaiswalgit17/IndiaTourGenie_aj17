document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("plannerForm");
  const output = document.getElementById("generatedItinerary");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    const days = document.getElementById("days").value;
    const interests = document.getElementById("interests").value;

    if (!destination || !days || !interests) {
      output.innerHTML = `<p>Please fill all fields!</p>`;
      return;
    }

    loader.style.display = "flex";
    output.innerHTML = "";

    try {
      const response = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: destination,
          days: parseInt(days),
          interests,
        }),
      });

      const data = await response.json();
      loader.style.display = "none";

      if (data.itinerary) {
        const itineraryHTML = `
          <div class="itinerary-card fade-in">
            <h3>Trip to ${destination}</h3>
            <p><strong>Duration:</strong> ${days} days</p>
            <p><strong>Interests:</strong> ${interests}</p>
            <div class="itinerary-content">
              ${formatItinerary(data.itinerary)}
            </div>
            <p>🧾 Reference Code: <code>${generateReferenceCode()}</code></p>
            <button class="download-btn" id="downloadPDF">📄 Download as PDF</button>
          </div>
        `;

        output.innerHTML = itineraryHTML;

        document.getElementById("downloadPDF").addEventListener("click", () => {
          generatePDF(destination, days, interests, data.itinerary);
        });

        const trip = {
          destination,
          days,
          interests,
          itinerary: data.itinerary,
          id: Date.now(),
        };

        const existingTrips = JSON.parse(localStorage.getItem("trips")) || [];
        existingTrips.push(trip);
        localStorage.setItem("trips", JSON.stringify(existingTrips));
      } else {
        output.innerHTML = `<p>Failed to generate itinerary. Try again later.</p>`;
      }
    } catch (err) {
      console.error("Error:", err);
      loader.style.display = "none";
      output.innerHTML = `<p>Error connecting to server.</p>`;
    }
  });

  function generateReferenceCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  function formatItinerary(text) {
    const lines = text.split("\n").filter(line => line.trim() !== "");
    return lines.map(line => {
      if (/^Day\s*\d+/i.test(line)) {
        return `<h4 class="day-heading">${line.trim()}</h4>`;
      } else {
        return `<p>${line.trim()}</p>`;
      }
    }).join("");
  }

  async function generatePDF(destination, days, interests, itineraryText) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;
    doc.setFontSize(14);
    doc.text(`Trip to ${destination}`, 10, y); y += 10;
    doc.setFontSize(12);
    doc.text(`Duration: ${days} days`, 10, y); y += 8;
    doc.text(`Interests: ${interests}`, 10, y); y += 10;

    const lines = itineraryText.split("\n").filter(l => l.trim() !== "");
    lines.forEach(line => {
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
      if (/^Day\s*\d+/i.test(line)) {
        doc.setFont(undefined, "bold");
      } else {
        doc.setFont(undefined, "normal");
      }
      doc.text(line.trim(), 10, y);
      y += 8;
    });

    doc.save(`Itinerary_${destination}.pdf`);
  }
});
