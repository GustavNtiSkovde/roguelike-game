import { player } from "../gameloop.js";
import { Scene } from "../menutogame/menubuttons.js";
import { MonsterOnScreen} from "../objectlists.js"
export class Mob {
    constructor(type, x, y, hp, speed, dmg, attackSpeed, exp, pointsgiven, imgsrc) {
        this.type = type;
        this.attackSpeed = attackSpeed;
        this.lastAttackTime = 0;
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.maxHp = hp;
        this.speed = speed;
        this.dmg = dmg;
        this.dead = false;
        this.exp = exp;
        this.pointsgiven = pointsgiven;

        this.img = new Image();
        this.img.src = imgsrc;

        this.img.onload = () => {
            this.width = this.img.naturalWidth;
            this.height = this.img.naturalHeight;
        };

        this.nWidth = this.img.naturalWidth;
        this.nHeight = this.img.naturalHeight;
    }

    hitbox() {
        return {
            x: this.x + (this.width || 64) / 2,
            y: this.y + (this.height || 64) / 2,
            width: this.width || 64,
            height: this.height || 64
        };
    }

    moveTowardPlayer(player) {
        let mobX = player.x - this.x;
        let mobY = player.y - this.y;
        let distance = Math.sqrt(mobX * mobX + mobY * mobY);

        if ( distance > 0) {
            this.vx = (mobX / distance);
            this.vy = (mobY / distance);
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.dead = true;
        }
    }

    attack() {
        player.hp -= this.dmg;
        if (player.hp <= 0) {
            Scene.value = "Credits";
        }
    }
    canAttack() {
        const now = Date.now();
        if (now - this.lastAttackTime > this.attackSpeed) {
            this.lastAttackTime = now;
            return true;
        }
        return false;
    }

    update(player) {
        this.moveTowardPlayer(player);
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
    }

    draw(ctx, camera) {
        const cx = this.x + (this.width || 0) / 2;
        const cy = this.y + (this.height || 0) / 2;
        ctx.save();
        ctx.translate(cx - camera.x, cy - camera.y);
        ctx.drawImage(
            this.img, -(this.width || 0) / 2, -(this.height || 0) / 2
        );
        ctx.restore();
    }
}