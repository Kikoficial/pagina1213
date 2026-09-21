const sobre = document.getElementById("sobre");
const carta = document.getElementById("carta");

sobre.addEventListener("click", () => {
  sobre.style.display = "none";
  carta.classList.add("visible");
});
