import { ctx, Canvas } from "../canvasctx.js"
import { Scene } from "../menutogame/menubuttons.js"

const credits = [
    "Developed By",
    "Gustav Jakobsson",
    "",
    "Thank you for playing"
];

let yPosition = window.innerHeight;
const yspeed = 1;

const Title = new Image();
Title.src = "./game/pictures/menu/bakgrundcredit.png";

export function DrawCreditsScreen() {
    ctx.drawImage(Title, 0, 0, Canvas.width, Canvas.height);
}

export function drawCredits() {
    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";

    for (let i = 0; i < credits.length; i++) {
        ctx.fillText(credits[i], window.innerWidth / 2, yPosition + i * 50);
    }
    yPosition -= yspeed;

    if (yPosition + credits.length * 50 <= 0) {
        Scene.value = "Menu";
    }
}

export function startCredits() {
    yPosition = window.innerHeight;
}
