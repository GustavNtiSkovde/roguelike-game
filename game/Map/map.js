import { ctx, Canvas } from "../canvasctx.js"
import { CameraMan } from "../objectlists.js"
export const TILE_SIZE = 128;
const gridSize = 128;

export function drawMap() {
    ctx.fillStyle = "#1c3f09";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);

    ctx.strokeStyle = "#31e509";
    const offsetX = -CameraMan.x % gridSize;
    const offsetY = -CameraMan.y % gridSize;

    ctx.beginPath();
    // Draw all vertical lines
    for (let x = offsetX; x < Canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Canvas.height);
    }
    // Draw all horizontal lines
    for (let y = offsetY; y < Canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(Canvas.width, y);
    }
    ctx.stroke();
}