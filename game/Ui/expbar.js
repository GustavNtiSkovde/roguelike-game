import { Player } from "../characters/player.js";
import { ctx, Canvas } from "../canvasctx.js";

const expBarImg = new Image();
expBarImg.src = "./game/pictures/expbar.png"; // Change to your exp bar image

// Exp bar (vertical)
const barX = 20;
const barY = 20;
const barWidth = 20;
const barHeight = 500;
const fillColor = "#00ff00"; // Green color for exp

// Padding for the exp fill inside the bar
const paddingLeft = 4;
const paddingRight = 4;
const paddingTop = 4;
const paddingBottom = 4;

export function drawExpBar(player) {
    if (!player) return;
    
    // Draw background image
    ctx.drawImage(expBarImg, barX, barY, barWidth, barHeight);
    
    // Calculate progress 0 to 1 (percentage)
    const progress = Math.min(player.expamount / player.expToLevel, 1);
    
    // Calculate actual fill area (inside the outline)
    const fillWidth = barWidth - paddingLeft - paddingRight;
    const fillHeight = barHeight - paddingTop - paddingBottom;
    
    //Fill bar
    ctx.fillStyle = fillColor;
    const fillStartX = barX + paddingLeft;
    const fillStartY = barY + paddingTop + fillHeight * (1 - progress);
    ctx.fillRect(fillStartX, fillStartY, fillWidth, fillHeight * progress);
}