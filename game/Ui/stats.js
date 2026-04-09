import { ctx, Canvas} from "../canvasctx.js";

let X = 60;
let Y = 400;
let dX = 40;

export function drawStats(player) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Hp: ${player.hp} / ${player.maxHp}`, Canvas.width - Y, X);
    ctx.fillText(`Dmg: ${player.dmg}`, Canvas.width - Y, X + dX);
    ctx.fillText(`Attackspeed: ${player.attackSpeed}`, Canvas.width - Y, X+(2*dX));
    ctx.fillText(`Weapon: ${player.gun}`, Canvas.width - Y,  X+(3*dX))
}
