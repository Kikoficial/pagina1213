const song = document.getElementById("song");
const bar = document.getElementById("spotifyBar");
const playBtn = document.getElementById("spotifyPlay");
const progressFill = document.getElementById("progressFill");
const progressBar = document.getElementById("spotifyProgress");
const timeLabel = document.getElementById("spotifyTime");

function formatTime(t) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function syncUI() {
  if (song.paused) {
    bar.classList.remove("playing");
    playBtn.textContent = "▶";
  } else {
    bar.classList.add("playing");
    playBtn.textContent = "❚❚";
  }
}

song.addEventListener("play", syncUI);
song.addEventListener("pause", syncUI);

song.addEventListener("timeupdate", () => {
  const pct = song.duration ? (song.currentTime / song.duration) * 100 : 0;
  progressFill.style.width = `${pct}%`;
  timeLabel.textContent = `${formatTime(song.currentTime)} / ${formatTime(song.duration)}`;
});

playBtn.addEventListener("click", () => {
  if (song.paused) song.play();
  else song.pause();
});

progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  if (song.duration) song.currentTime = pct * song.duration;
});

// Retoma la canción justo donde iba al llegar desde otra página.
const savedTime = parseFloat(localStorage.getItem("songTime"));
const wasPlaying = localStorage.getItem("songPlaying") !== "false";

if (!isNaN(savedTime)) {
  song.currentTime = savedTime;
}

if (wasPlaying) {
  song.play().catch(() => {
    const resumeOnInteraction = () => {
      song.play();
      document.removeEventListener("click", resumeOnInteraction);
      document.removeEventListener("keydown", resumeOnInteraction);
    };
    document.addEventListener("click", resumeOnInteraction);
    document.addEventListener("keydown", resumeOnInteraction);
  });
}

syncUI();

// Guarda el progreso para que la canción continúe donde iba al cambiar de página.
window.addEventListener("beforeunload", () => {
  localStorage.setItem("songTime", song.currentTime);
  localStorage.setItem("songPlaying", (!song.paused).toString());
});
