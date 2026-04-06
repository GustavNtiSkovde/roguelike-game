import { ctx, Canvas} from "../canvasctx.js";

export function drawStats(player) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Hp: ${player.hp} / ${player.maxHp}`, Canvas.width - 400, 60);
    ctx.fillText(`Dmg: ${player.dmg}`, Canvas.width - 400, 100);
    ctx.fillText(`Attackspeed: ${player.attackSpeed}`, Canvas.width - 400, 140);
}
