import { Scene } from "./menutogame/menubuttons.js";
import { CharacterList, MenuButtonList, CameraMan, bulletsOnScreen, MonsterOnScreen } from "./objectlists.js";
import { DrawMenuScreen } from "./menutogame/screen.js";
import { Canvas, ctx } from "./canvasctx.js";
import { drawCredits, DrawCreditsScreen, startCredits } from "./ui/credits.js";
import { spawnMob } from "./monsters/mobspawner.js";

export function canvasResize() {
    Canvas.width = window.innerWidth;
    Canvas.height = window.innerHeight;
    CameraMan.width = Canvas.width;
    CameraMan.height = Canvas.height;

    MenuButtonList.forEach(button => {
        button.centerX = Canvas.width / 2;
        button.centerY = Canvas.height / 2;
    });
}

canvasResize();

//Variables
export let player = CharacterList[0];

//Spawning
let lastSpawnTime = 0;
const spawnInterval = 2000;

//attack speed
let currentAttackDone = 0;

function MenuScene() {
    creditsStarted = false;
    DrawMenuScreen();
    MenuButtonList.forEach(Button => {
        Button.draw(ctx);
    });
}

function GameScene() {
    player = CharacterList[0];

    player.update();
    CameraMan.follow(player);

    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);

    ctx.strokeStyle = "#3a3a3a";
    const gridSize = 128;
    const offsetX = -CameraMan.x % gridSize;
    const offsetY = -CameraMan.y % gridSize;
    for (let x = offsetX; x < Canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Canvas.height);
        ctx.stroke();
    }
    for (let y = offsetY; y < Canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(Canvas.width, y);
        ctx.stroke();
    }

    // Spawn mob every 2 seconds
    const now = Date.now();
    if (now - lastSpawnTime > spawnInterval) {
        spawnMob(CameraMan);
        lastSpawnTime = now;
    }

    // draw and update bullets
    bulletsOnScreen.forEach((b, idx) => {
        b.update();
        b.draw(ctx, CameraMan);
        // remove if far outside of camera view
        if (
            b.x < CameraMan.x - 100 ||
            b.x > CameraMan.x + Canvas.width + 100 ||
            b.y < CameraMan.y - 100 ||
            b.y > CameraMan.y + Canvas.height + 100
        ) {
            bulletsOnScreen.splice(idx, 1);
        }
    });

    // draw and update monsters
    MonsterOnScreen.forEach((m, idx) => {
        m.update(player);
        m.draw(ctx, CameraMan);

        // Bullet collisions
        bulletsOnScreen.forEach((b, bIdx) => {
            const bHitbox = b.hitbox();
            const mHitbox = m.hitbox();
            
            if (
                bHitbox.x < mHitbox.x + mHitbox.width &&
                bHitbox.x + bHitbox.width > mHitbox.x &&
                bHitbox.y < mHitbox.y + mHitbox.height &&
                bHitbox.y + bHitbox.height > mHitbox.y
            ) {
                m.takeDamage(b.dmg);
                bulletsOnScreen.splice(bIdx, 1);
            }
        });

        // Mob and Player collisions
        const playerHitbox = player.hitbox();
        const mobHitbox = m.hitbox();
        if (
            playerHitbox.x < mobHitbox.x + mobHitbox.width &&
            playerHitbox.x + playerHitbox.width > mobHitbox.x &&
            playerHitbox.y < mobHitbox.y + mobHitbox.height &&
            playerHitbox.y + playerHitbox.height > mobHitbox.y
        ) {
            if (m.canAttack()) {
                m.attack();
            }
        }

        if (m.dead) {
            MonsterOnScreen.splice(idx, 1);
        }
    });

    player.draw(ctx, CameraMan);
}

let creditsStarted = false;

function creditScene() {
    DrawCreditsScreen();
    if (!creditsStarted) {
        creditsStarted = true;
        startCredits();
    }
    drawCredits();
}

function gameLoop() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    if (Scene.value === "Menu") MenuScene();
    else if (Scene.value === "Game") GameScene();
    else if (Scene.value === "Credits") creditScene();

    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener("resize", canvasResize);
