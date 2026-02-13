/* =========================
   AUDIO PLAYER ENGINE
========================= */

const audio = new Audio();
let playlist = [];
let currentIndex = -1;

/* =========================
   SONG MAP (EDIT PATHS)
========================= */

const songMap = {

  /* ===== TRENDING ===== */

  "Blinding Lights|The Weeknd": "The Weeknd - Blinding Lights (Official Audio).mp3",
  "FE!N|Travis Scott": "songs/Travis Scott - FEIN.mp3",
  "High Hopes|Panic! at the Disco": "songs/Panic At The Disco - High Hopes.mp3",
  "Enemy|Imagine Dragons": "songs/Imagine Dragons - Enemy.mp3",
  "Believer|Imagine Dragons": "songs/Imagine Dragons - Believer.mp3",
  "Thunder|Imagine Dragons": "songs/Imagine Dragons - Thunder.mp3",
  "Bones|Imagine Dragons": "songs/Imagine Dragons - Bones.mp3",
  "Night Changes|One Direction": "songs/One Direction - Night Changes.mp3",
  "Sunsetz|Cigarettes After Sex": "songs/Cigarettes After Sex - Sunsetz.mp3",
  "Apocalypse|Cigarettes After Sex": "songs/Cigarettes After Sex - Apocalypse.mp3",

  /* ===== MARATHI ===== */

  "Kitida Navyane|Aarya Ambekar": "",
  "Kaakan|Shankar Mahadevan, Neha Rajpal": "",
  "O Raaje|Avadhoot Gupte": "",
  "Raja Aala|Avadhoot Gupte": "",
  "Man Udhan Varyache|Shankar Mahadevan": "",
  "Radha Hi Bawri|Swapnil Bandodkar": "",
  "Galavar Khali|Swapnil Bandodkar": "",
  "Natarang Ubha|Ajay-Atul": "",

  /* ===== BOLLYWOOD ===== */

  "Gehra Hua|Arijit Singh": "",
  "Khamoshiyan|Arijit Singh": "",
  "Jugraafiya|Udit Narayan, Shreya Ghoshal": "",
  "Dilbar Mere|Kishore Kumar": "",
  "Gulabi Aankhen|Mohammed Rafi": "",
  "Ek Ajnabee Haseena Se|Kishore Kumar": "",
  "Ishq Jalaakar|Javed Ali": "",

  /* ===== ENGLISH ===== */

  "Until I Found You|Stephen Sanchez": "",
  "Pray for Me|The Weeknd, Kendrick Lamar": "",
  "No Surprises|Radiohead": "",
  "Lucid Dreams|Juice WRLD": "",
  "Hope|XXXTENTACION": "songs/XXXTENTACION - Hope.mp3",
  "Moonlight|XXXTENTACION": "songs/XXXTENTACION - Moonlight.mp3",
  "Jocelyn Flores|XXXTENTACION": "songs/XXXTENTACION - Jocelyn Flores.mp3",
  "Heathens|Twenty One Pilots": "",
  "Talking to the Moon|Bruno Mars": "",

  /* ===== JAPANESE / ANIME ===== */

  "Shinunoga E-Wa|Fujii Kaze": "songs/Fujii Kaze - Shinunoga E Wa.mp3",
  "Gyakuyume|King Gnu": "",
  "il vento d'oro|Yugo Kanno": "",
  "Fly High!!|BURNOUT SYNDROMES": "",
  "Lost in Paradise|ALI": "songs/ALI - Lost In Paradise.mp3",
  "Cry Baby|Official HIGE DANDism": "songs/Official HIGE DANDism - Cry Baby.mp3"

};


/* =========================
   BUILD PLAYLIST FROM PAGE
========================= */

document.querySelectorAll(".song-card").forEach((card, index) => {

  const title = card.querySelector(".song-title").innerText.trim();
  const artist = card.querySelector(".song-artist").innerText.trim();
  const key = `${title}|${artist}`;

  if (songMap[key]) {
    playlist.push({
      title,
      artist,
      src: songMap[key],
      cover: card.querySelector("img").src
    });

    card.addEventListener("click", () => {
      playSong(index);
    });
  }
});

/* =========================
   PLAY SONG
========================= */

function playSong(index){
  currentIndex = index;
  const song = playlist[index];

  audio.src = song.src;
  audio.play();

  document.getElementById("player-title").innerText = song.title;
  document.getElementById("player-artist").innerText = song.artist;
  document.getElementById("player-cover").src = song.cover;
  document.getElementById("play").innerText = "⏸";
}

/* =========================
   PLAY / PAUSE
========================= */

document.getElementById("play").onclick = () => {
  if(audio.paused){
    audio.play();
    play.innerText="⏸";
  } else {
    audio.pause();
    play.innerText="▶";
  }
};

/* =========================
   NEXT / PREV
========================= */

document.getElementById("next").onclick = () => {
  if(currentIndex < playlist.length-1) playSong(currentIndex+1);
};

document.getElementById("prev").onclick = () => {
  if(currentIndex > 0) playSong(currentIndex-1);
};

/* =========================
   PROGRESS BAR
========================= */

const progress = document.getElementById("progress");

audio.ontimeupdate = () => {
  if(audio.duration){
    progress.value = (audio.currentTime/audio.duration)*100;
    document.getElementById("current-time").innerText = format(audio.currentTime);
    document.getElementById("duration").innerText = format(audio.duration);
  }
};

progress.oninput = () => {
  audio.currentTime = (progress.value/100)*audio.duration;
};

/* =========================
   VOLUME
========================= */

document.getElementById("volume").oninput = e=>{
  audio.volume = e.target.value;
};

/* =========================
   AUTO NEXT
========================= */

audio.onended = ()=>{
  if(currentIndex < playlist.length-1) playSong(currentIndex+1);
};

/* =========================
   TIME FORMAT
========================= */

function format(sec){
  if(!sec) return "0:00";
  let m = Math.floor(sec/60);
  let s = Math.floor(sec%60);
  if(s<10) s="0"+s;
  return m+":"+s;
}

/* ===============================
   MODAL SYSTEM (LOGIN / SIGNUP / PLAYLIST)
================================= */

const modalHTML = `
<div class="modal-overlay" id="modalOverlay">
  <div class="modal">
    <span class="close-btn" id="closeModal">&times;</span>
    <h2 id="modalTitle">Title</h2>
    <form id="modalForm">
      <input type="text" id="username" placeholder="Username">
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <button type="submit" id="submitBtn">Submit</button>
      <p class="error" id="formError"></p>
    </form>
  </div>
</div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

const modal = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const form = document.getElementById("modalForm");
const errorText = document.getElementById("formError");

/* ===============================
   OPEN MODALS
================================= */

document.querySelector(".signup-btn").addEventListener("click", () => {
  modal.style.display = "flex";
  modalTitle.innerText = "Create Account";
});

document.querySelector(".login-btn").addEventListener("click", () => {
  modal.style.display = "flex";
  modalTitle.innerText = "Login";
});

document.querySelector(".create-btn").addEventListener("click", () => {
  modal.style.display = "flex";
  modalTitle.innerText = "Create Playlist";
});

/* ===============================
   CLOSE MODAL
================================= */

document.getElementById("closeModal").addEventListener("click", () => {
  modal.style.display = "none";
  errorText.innerText = "";
  form.reset();
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    errorText.innerText = "";
    form.reset();
  }
});

/* ===============================
   FORM VALIDATION
================================= */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    errorText.innerText = "All fields are required";
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    errorText.innerText = "Invalid email format";
    return;
  }

  errorText.style.color = "#1db954";
  errorText.innerText = "Success ✔";

  setTimeout(() => {
    modal.style.display = "none";
    form.reset();
    errorText.innerText = "";
  }, 1200);
});
