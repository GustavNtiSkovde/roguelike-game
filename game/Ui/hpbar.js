import { Player } from "../characters/player.js";
import { ctx, Canvas } from "../canvasctx.js";

const hpBarImg = new Image();
hpBarImg.src = "./game/pictures/hpbar.png";

// HP bar (horizontal)
const hpBarX = Canvas.width / 2 - 40;
const hpBarY = Canvas.height/2 + 120;
const hpBarWidth = 80;
const hpBarHeight = 4;
const hpFillColor = "#ff0000"; // Red color for hp

// Padding for the hp fill inside the bar
const hpPaddingLeft = 0.5;
const hpPaddingRight = 0.5;
const hpPaddingTop = 0.5;
const hpPaddingBottom = 0.5;

export function drawhpBar(player) {
    if (!player) return;
    
    // Draw background image
    ctx.drawImage(hpBarImg, hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    
    // Calculate progress 0 to 1 (percentage)
    const progress = Math.min(player.hp / player.maxHp, 1);
    
    // Calculate actual fill area
    const fillWidth = hpBarWidth - hpPaddingLeft - hpPaddingRight;
    const fillHeight = hpBarHeight - hpPaddingTop - hpPaddingBottom;
    
    // Fill bar
    ctx.fillStyle = hpFillColor;
    const fillStartX = hpBarX + hpPaddingLeft;
    const fillStartY = hpBarY + hpPaddingTop;
    ctx.fillRect(fillStartX, fillStartY, fillWidth * progress, fillHeight);
}