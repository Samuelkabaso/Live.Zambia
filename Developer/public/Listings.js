// Listings.js

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCA6oxno4zHhbBgOB7Y5EpmR3fMl9Y8SX4",
  authDomain: "live-281b2.firebaseapp.com",
  databaseURL: "https://live-281b2-default-rtdb.firebaseio.com",
  projectId: "live-281b2",
  storageBucket: "live-281b2.appspot.com",
  messagingSenderId: "138809616254",
  appId: "1:138809616254:web:bc91cd4b22df745b86352f",
  measurementId: "G-QCV0T1PGGM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Map setup
const map = L.map("map").setView([-15.3875, 28.3228], 12); // Lusaka
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const propertiesContainer = document.getElementById("properties");

// Load listings from Firestore
async function loadListings() {
  try {
    const snapshot = await db.collection("listings").get();

    if (snapshot.empty) {
      propertiesContainer.innerHTML = `<p class="text-gray-600">No listings found.</p>`;
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data) {
        renderListing(data);
        if (data.lat && data.lng) {
          addMapMarker(data);
        }
      }
    });
  } catch (error) {
    console.error("Failed to load listings:", error);
    propertiesContainer.innerHTML = `<p class="text-red-600">Failed to load listings. Please try again later.</p>`;
  }
}

function renderListing(data) {
  const card = document.createElement("div");
  card.className = "bg-white bg-opacity-90 rounded-xl shadow p-4 cursor-pointer transition hover:shadow-lg";
  card.style.transition = "transform 0.2s";
  card.style.cursor = "pointer";

  card.innerHTML = `
    <h3 class="text-xl font-semibold mb-1">${data.title || "Untitled Property"}</h3>
    <p class="text-sm text-gray-600 mb-2">${data.description || "No description available."}</p>
    <p class="text-sm"><strong>Location:</strong> ${data.location || "Unknown"}</p>
    <p class="text-sm"><strong>Price:</strong> ZMW ${data.price?.toLocaleString?.() || "N/A"}</p>
    <p class="text-sm"><strong>Bedrooms:</strong> ${data.bedrooms || "N/A"}</p>
    <p class="text-sm"><strong>Status:</strong> ${data.status || "N/A"}</p>

    <div class="mt-4">
      <button class="interested-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105">
        I'm Interested
      </button>
    </div>
  `;

  // 📌 Zoom to map location when card is clicked
  if (data.lat && data.lng) {
    card.addEventListener("click", (e) => {
      // Prevent "I'm Interested" button from triggering zoom
      if (!e.target.classList.contains("interested-btn")) {
        map.setView([data.lat, data.lng], 15); // Adjust zoom level as needed
      }
    });
  }

  // 🎯 "I'm Interested" button listener
  card.querySelector(".interested-btn").addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent parent click event
    alert(`Thanks for your interest in "${data.title || "this property"}"! We’ll get in touch soon.`);
  });

  propertiesContainer.appendChild(card);
}

// Add marker on the map
function addMapMarker(data) {
  const marker = L.marker([data.lat, data.lng]).addTo(map);
  marker.bindPopup(`
    <strong>${data.title || "Listing"}</strong><br>
    ${data.location || ""}<br>
    ZMW ${data.price?.toLocaleString?.() || ""}
  `);
}

window.addEventListener("DOMContentLoaded", loadListings);
