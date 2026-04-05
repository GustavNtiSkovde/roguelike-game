import { Scene } from "./menutogame/menubuttons.js";
import { CharacterList, MenuButtonList, CameraMan, bulletsOnScreen, MonsterOnScreen } from "./objectlists.js";
import { DrawMenuScreen } from "./menutogame/screen.js";
import { Canvas, ctx } from "./canvasctx.js";
import { DrawCreditsScreen, startCredits } from "./ui/credits.js";
import { spawnMob } from "./monsters/mobspawner.js";
import { drawExpBar } from "./Ui/expbar.js";
import { drawhpBar } from "./Ui/hpbar.js";

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

//Lvl up
export let playerNewLvl = false;

// Score
let lvlscoremultiplier = 1.6;
let lvlscore = 75;
export let maxScore = 0;
export let score = 0;

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

        //Kill
        if (m.dead) {
            player.expamount += m.exp;
            console.log(player.expamount);
            MonsterOnScreen.splice(idx, 1);
            score += m.pointsgiven;
        }

        //exp lvl up
        if (player.expamount >= player.expToLevel) {
            playerNewLvl = true;
            player.lvl++;
            player.expamount = 0;
            player.expToLevel *= 1.25;
            lvlscore *= lvlscoremultiplier;
            score += Math.floor(lvlscore);
            console.log(player.expToLevel, player.expamount);
        }

        if (score > maxScore) {
            maxScore = score;
        }
    });

    //Draw score
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 60, 60);

    drawExpBar(player);
    drawhpBar(player);
    player.draw(ctx, CameraMan);
}

let creditsStarted = false;
let creditsScore = 0;
let creditsMaxScore = 0;

function creditScene() {
    if (!creditsStarted) {
        creditsStarted = true;
        creditsScore = score; // Save current score
        creditsMaxScore = maxScore; // Save max score
        startCredits();
    }
    DrawCreditsScreen(creditsMaxScore, creditsScore);
}

function gameLoop() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    if (Scene.value === "Menu") {
        creditsStarted = false; // Reset for next game
        MenuScene();
    }
    else if (Scene.value === "Game") GameScene();
    else if (Scene.value === "Credits") {
        creditScene();
        player.hp = 100; // reset player hp
        MonsterOnScreen.length = 0; // clear monsters 
        player.expamount = 0; // reset exp
        player.lvl = 0; // reset level
        player.expToLevel = 100; // reset exp requirement
        score = 0; // reset score
    }
        

    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener("resize", canvasResize);
