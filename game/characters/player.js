import { Character } from "./superclass.js";
import { bulletTemplates } from "../bullets/bulletList.js";
import { Bullet } from "../bullets/bullet.js";
import { bulletsOnScreen, CameraMan } from "../objectlists.js";

const keys = {};

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

//Weapon
let currentWeapon = "pistol";
// Player lvl
let lvl = 0;

export class Player extends Character {
    constructor(x, y, maxHp, baseHp, hp, name, imgSrc) {
        super(x, y, name, imgSrc);
        this.maxHp = maxHp;
        this.baseHp = baseHp;
        this.hp = hp;
        this.speed = 5;
        this.facing = "down";
        this.moving = false;
        this.shooting = false;
        this.gun = currentWeapon;
        this.lastShotTime = 0;
        this.expamount = 95;
        this.lvl = 0;
        this.expToLevel = 100;
        
        // Weapon stats
        const weaponTemplate = bulletTemplates[this.gun];
        this.dmg = weaponTemplate.dmg;
        this.attackSpeed = weaponTemplate.speed;
    }

    hitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width || 64,
            height: this.height || 64
        };
    }

    //Shooting logic
    attack() {
        const tpl = bulletTemplates[this.gun];
        if (!tpl) return;

        // ShootCooldown
        const rate = tpl.fireRate || 0;
        if (rate > 0) {
            const now = Date.now();
            const msBetweenShots = 1000 / rate;
            if (now - this.lastShotTime < msBetweenShots) {
                return;
            }
            this.lastShotTime = now;
        }

        // Point to shoot at
        const cx = this.x + (this.width || 0) / 2;
        const cy = this.y + (this.height || 0) / 2;
        const worldMouseX = mouseX + CameraMan.x;
        const worldMouseY = mouseY + CameraMan.y;
        const angle = Math.atan2(worldMouseY - cy, worldMouseX - cx);

        const b = new Bullet(this.gun, cx, cy, angle, this.attackSpeed, this.dmg, tpl.imgsrc);
        bulletsOnScreen.push(b);
    }

    update() {
        //Movement
        let dirX = 0;
        let dirY = 0;

        if (keys["ArrowUp"] || keys["w"] || keys["W"]) dirY -= 1;
        if (keys["ArrowDown"] || keys["s"] || keys["S"]) dirY += 1;
        if (keys["ArrowLeft"] || keys["a"] || keys["A"]) dirX -= 1;
        if (keys["ArrowRight"] || keys["d"] || keys["D"]) dirX += 1;

        this.moving = dirX !== 0 || dirY !== 0;

        if (this.moving) {
            // Pythagorean theorem to get length of vector
            let length = Math.sqrt(dirX * dirX + dirY * dirY);

            // Normalize vector
            this.x += (dirX / length) * this.speed;
            this.y += (dirY / length) * this.speed;
        }
        
        //Shoot
        if (keys[" "]) {
            this.attack();
        }
    }

    draw(ctx, camera) {
        const worldMouseX = mouseX + camera.x;
        const worldMouseY = mouseY + camera.y;

        const cx = this.x + (this.width || 0) / 2;
        const cy = this.y + (this.height || 0) / 2;
        let angle = Math.atan2(worldMouseY - cy, worldMouseX - cx);
        angle += Math.PI / 2; //Math.atan2s 0 grader är åt höger, tar detta för det ska vara 90 grader så att gubben vapen är mot musen.

        ctx.save();
        ctx.translate(cx - camera.x, cy - camera.y);
        ctx.rotate(angle);
        ctx.drawImage(
            this.img, -(this.width || 0) / 2, -(this.height || 0) / 2
        );
        ctx.restore();
    }
}

document.addEventListener("keydown", e => { keys[e.key] = true; });
document.addEventListener("keyup", e => { keys[e.key] = false; });