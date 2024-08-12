const COHORT = "2407-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const form = document.querySelector("#form");
const container = document.querySelector(".container");
const guestName = document.querySelector("#name");
const date = document.querySelector("#date");
const loc = document.querySelector("#location");
const description = document.querySelector("#description");
const button = document.querySelector("#button");
const state = {
  events: [],
};

async function getData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;
  } catch (error) {
    console.error(error);
  }
}

async function render() {
  await getData();
  renderPartyInfor();
}
1;
function renderPartyInfor() {
  if (!state.events.length) {
    container.innerHTML = "<li>No events.</li>";
    return;
  }
  const eventCards = state.events.map((event) => {
    const div = document.createElement("div");

    div.innerHTML = `<h1>${event.name}</h1>
    <h1>${event.name}</h1>
    <h1>${event.location}</h1>
    <p>${event.description}</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = "Delete Event";
    btn.addEventListener("click", () => deleteEvent(event.id));

    div.appendChild(btn);

    return div;
  });

  container.replaceChildren(...eventCards);
}

async function postParty(e) {
  e.preventDefault();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: guestName.value,
        date: new Date(date.value).toISOString(),
        location: loc.value,
        description: description.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    // const json = await response.json();
    render();
  } catch (error) {
    console.error(error);
  }
}

// Function to delete Event
async function deleteEvent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Event could not be delete");
    }
  } catch (error) {
    console.log(error);
  }
  render();
}

button.addEventListener("click", postParty);
render();
