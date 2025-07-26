// utils.js

/**
 * Show a toast message
 * @param {string} message
 * @param {string} type (success, error, info)
 */
function showToast(message, type = 'info') {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: type === 'success' ? "#4caf50" : type === 'error' ? "#f44336" : "#333",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    zIndex: "9999",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    opacity: "0",
    transition: "opacity 0.4s ease"
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Example usage:
// showToast(\"Trip saved successfully!\", \"success\");
// showToast(\"Failed to load itinerary.\", \"error\");
