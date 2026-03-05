import { Canvas, ctx } from "../canvasctx.js";

const Title = new Image();
Title.src = "./game/pictures/menu/menuscreen.png";

let loaded = false;

Title.onload = () => {
    loaded = true;
};

export function DrawMenuScreen() {
    if (loaded) {
        ctx.drawImage(Title, 0, 0, Canvas.width, Canvas.height);
    }
}
