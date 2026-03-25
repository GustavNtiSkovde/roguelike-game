import { MonsterOnScreen } from "../objectlists.js"
import { Mob } from "../characters/mob.js";
import { mobTemplates } from "./mobList.js";

function chooseMobToSpawn() {
    //Choose a random mob from moblist
    let pickedMob = Math.random(mobTemplates);

    
    //Template  name
    const tpl = bulletTemplates[pickedMob];

    //Random spawn cordinates
    let rx = Math.random();
    let ry = Math.random();
}
function spawnMobs() {
    if (MonsterOnScreen == 0) {
        const m = new Mob(pickedMob, rx, ry, speed, tpl.dmg, tpl.imgsrc);
        bulletsOnScreen.push(m);
    }
}