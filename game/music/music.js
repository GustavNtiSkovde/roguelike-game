export let backgroundmusic = null;

export function initializeMusic() {
    if (!backgroundmusic) {
        backgroundmusic = new Audio("./game/music/bgmusic.mp3");
        backgroundmusic.volume = 0.1;
        backgroundmusic.loop = true;
    }
    return backgroundmusic;
}

export function playMusic() {
    if (!backgroundmusic) {
        initializeMusic();
    }
    backgroundmusic.play();
}

export function setMusicVolume(volume) {
    if (!backgroundmusic) {
        initializeMusic();
    }
    backgroundmusic.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0-1
    console.log("Music volume set to:", backgroundmusic.volume);
}