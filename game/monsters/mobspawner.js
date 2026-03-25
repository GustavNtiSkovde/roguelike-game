import { MonsterOnScreen } from "../objectlists.js"
import { Mob } from "../characters/mob.js";
import { randomMob } from "./mobList.js";

// Spawn a mob at a random position just outside the camera view
function spawnMob(camera) {
    // Place to spawn
    const margin = 100;
    const edge = Math.floor(Math.random() * 4);

    let x, y;
    switch (edge) {
        case 0: // top
            x = camera.x + Math.random() * camera.width;
            y = camera.y - margin;
            break;
        case 1: // bottom
            x = camera.x + Math.random() * camera.width;
            y = camera.y + camera.height + margin;
            break;
        case 2: // left
            x = camera.x - margin;
            y = camera.y + Math.random() * camera.height;
            break;
        case 3: // right
            x = camera.x + camera.width + margin;
            y = camera.y + Math.random() * camera.height;
            break;
    }

    const tpl = bulletTemplates[this.gun];

    const mob = new Mob(randomMob, x, y, tpl.speed, tpl.dmg, tplimgsrc);
    MonsterOnScreen.push(mob);
}