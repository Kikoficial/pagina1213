const startDate = new Date(2026, 5, 20, 0, 0, 0); // 20 de junio de 2026
const counterValues = document.getElementById("counterValues");

function updateCounter() {
  const now = new Date();
  let diffMs = now - startDate;

  if (diffMs < 0) {
    counterValues.textContent = "¡Aún no empezamos!";
    return;
  }

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const parts = [];
  if (years > 0) parts.push(`${years}a`);
  if (months > 0 || years > 0) parts.push(`${months}m`);
  parts.push(`${days}d`);

  const timeStr = [hours, minutes, seconds]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");

  counterValues.textContent = `${parts.join(" ")} ${timeStr}`;
}

updateCounter();
setInterval(updateCounter, 1000);
