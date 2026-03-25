import { MonsterOnScreen } from "../objectlists.js"
import { Mob } from "../characters/mob.js";
import { mobTemplates } from "./mobList.js";

// Spawn a mob at a random position just outside the camera view
export function spawnMob(camera) {
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

    // Get random mob template
    const keys = Object.keys(mobTemplates);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const tpl = mobTemplates[randomKey];

    const mob = new Mob(randomKey, x, y, tpl.speed, tpl.dmg, tpl.imgsrc);
    MonsterOnScreen.push(mob);
}