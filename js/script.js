function toggleMap() {
  var mapContainer = document.getElementById("map-container");
  mapContainer.classList.toggle("open");
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function askForCurrentLocation() {
  const inputField = document.getElementById("location");

  if (inputField.value.trim() === "") {
    const confirmation = confirm(
      "Você deseja usar sua localização atual para preencher o endereço?"
    );
    if (confirmation) {
      if ("geolocation" in navigator) {
        const options = {
          enableHighAccuracy: true,
        };
        navigator.geolocation.getCurrentPosition(
          showPosition,
          showError,
          options
        );
      } else {
        alert("Geolocalização não é suportada por este navegador.");
      }
    }
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  findAddress(lat, lng);
}

function showError(error) {
  alert("Erro ao obter localização: " + error.message);
}

function findAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=pt-BR`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Endereço não encontrado.");
      } else {
        const street = data.address.road || "";
        const inputField = document.getElementById("location");
        inputField.value = street;
      }
    })
    .catch((error) => {
      alert("Erro ao obter endereço: " + error);
    });
}

function validateForm() {
  var reportType = document.getElementById("reportType").value;
  var description = document.getElementById("description").value;
  var location = document.getElementById("location").value;
  var date = document.getElementById("date").value;

  if (
    reportType === "" ||
    description === "" ||
    location === "" ||
    date === ""
  ) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  alert("Formulário enviado com sucesso!");
  return true;
}
