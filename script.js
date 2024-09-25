const songsList = [
    {
        name: "Stay with Me",
        artist: "Miki Matsubara",
        src: "miki matsubara - Stay With Me.mp3",
        cover: "stay with me.jpg"
    },
    {
        name: "Flyday Chinatown",
        artist: "Yasuha",
        src: "Yasuha - Flyday Chinatown.mp3",
        cover: "flyday Chinatown.jpg"
    },
    {
        name: "Plastic Love",
        artist: "Mariya Takeuchi",
        src: "Mariya Takeuchi - Plastic Love.mp3",
        cover: "Plastic love.jpg"
    },
    {
        name: "Remember Summer Days",
        artist: "Anri",
        src: "Anri - Remember Summer Days.mp3",
        cover: "Remember Summer days.jpg"
    },
    {
        name: "Spike Spiegel",
        artist: "Cowboy Bebop Soundtrack",
        src: "bebop - Spike Spiegel.mp3",
        cover: "cowboy-bebop-soundtrack.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const muiscName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    muiscName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    console.log("Play/Pause button clicked");
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    console.log('Next button clicked');
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    console.log('Prev button clicked');
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}
