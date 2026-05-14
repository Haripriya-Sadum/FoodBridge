import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// TAB ELEMENTS
const donorTab = document.getElementById("donorTab");
const receiverTab = document.getElementById("receiverTab");

const donorSection = document.getElementById("donorSection");
const receiverSection = document.getElementById("receiverSection");

// FORM ELEMENTS
const donateBtn = document.getElementById("donateBtn");
const quote = document.getElementById("quote");

// QUOTES
const quotes = [
  "🌍 One meal can change a life.",
  "❤️ Your kindness feeds hope.",
  "🙏 Thank you for sharing food and love.",
  "🍽️ No one sleeps hungry because of you.",
  "✨ Small act, big impact."
];

// TAB SWITCHING
donorTab.onclick = () => {
  donorSection.classList.remove("hidden");
  receiverSection.classList.add("hidden");
};

receiverTab.onclick = () => {
  receiverSection.classList.remove("hidden");
  donorSection.classList.add("hidden");
  loadDonations(); // load from Firebase
};

// DONATE BUTTON
donateBtn.onclick = async () => {
  const donorName = document.getElementById("donorName").value;
  const foodName = document.getElementById("foodName").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.getElementById("location").value;
  const phone = document.getElementById("phone").value;

  if (!donorName || !foodName || !quantity || !location || !phone) {
    quote.innerText = "❌ Please fill all fields";
    quote.style.color = "red";
    return;
  }

  // SAVE TO FIRESTORE
  await addDoc(collection(db, "donations"), {
    donorName,
    foodName,
    quantity,
    location,
    phone,
    status: "Available"
  });

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quote.innerText = `🙏 Thank you ${donorName}! ${randomQuote}`;
  quote.style.color = "green";

  donateBtn.disabled = true;
  donateBtn.innerText = "Submitted ✅";
};

// LOAD FOOD LIST FROM FIREBASE
async function loadDonations() {
  const foodList = document.getElementById("foodList");
  foodList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "donations"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.donorName}</td>
      <td>${data.foodName}</td>
      <td>${data.quantity}</td>
      <td>${data.location}</td>
      <td>${data.phone}</td>
      <td>${data.status}</td>
      <td>
        ${
          data.status === "Available"
            ? `<button onclick="acceptFood('${docSnap.id}')">Accept</button>`
            : "✔ Accepted"
        }
      </td>
    `;

    foodList.appendChild(row);
  });
}

// ACCEPT FOOD
window.acceptFood = async function (id) {
  const ref = doc(db, "donations", id);
  await updateDoc(ref, { status: "Accepted" });
  loadDonations();
};
