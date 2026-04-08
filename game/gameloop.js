import { Scene } from "./menutogame/menubuttons.js";
import { CharacterList, MenuButtonList, CameraMan, bulletsOnScreen, MonsterOnScreen, CardsOnScreen } from "./objectlists.js";
import { DrawMenuScreen } from "./menutogame/screen.js";
import { Canvas, ctx } from "./canvasctx.js";
import { DrawCreditsScreen, startCredits } from "./ui/credits.js";
import { spawnMob } from "./monsters/mobspawner.js";
import { drawExpBar } from "./Ui/expbar.js";
import { drawhpBar } from "./Ui/hpbar.js";
import { spawnCards, drawCards, areCardsActive } from "./cards/cardchoser.js";
import { drawStats } from "./Ui/stats.js";
import { waveManager } from "./wave/wavemanager.js";
import { backgroundmusic, initializeMusic, playMusic, setMusicVolume } from "./music/music.js";

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

//Lvl up
export let playerlevelup = false;

export function setPlayerLevelUp(value) {
    playerlevelup = value;
}

// Score
let lvlscoremultiplier = 1.6;
let lvlscore = 75;
export let maxScore = 0;
export let score = 0;

// Initialize wave system
waveManager.startWave();

function MenuScene() {
    creditsStarted = false;
    DrawMenuScreen();
    MenuButtonList.forEach(Button => {
        Button.draw(ctx);
    });
}

function GameScene() {
    // Start background music once
    if (!backgroundmusic) {
        initializeMusic();
        playMusic();
        setMusicVolume(0.1); // 0-1 scale, adjust as needed
    }

    player = CharacterList[0];

    // Only update player if cards are not active
    if (!areCardsActive()) {
        player.update();
    }
    CameraMan.follow(player);

    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);

    ctx.strokeStyle = "#3a3a3a";
    const gridSize = 128;
    const offsetX = -CameraMan.x % gridSize;
    const offsetY = -CameraMan.y % gridSize;
    
    ctx.beginPath();
    // Draw all vertical lines
    for (let x = offsetX; x < Canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Canvas.height);
    }
    // Draw all horizontal lines
    for (let y = offsetY; y < Canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(Canvas.width, y);
    }
    ctx.stroke();

    // Spawn mobs based on waves
    if (!areCardsActive()) {
        waveManager.update(CameraMan);
    }

    // Only update game state if cards are not active
    if (!areCardsActive()) {
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
                MonsterOnScreen.splice(idx, 1);
                score += m.pointsgiven;
            }

            //exp lvl up
            if (player.expamount >= player.expToLevel) {
                playerlevelup = true;
                player.lvl++;
                player.expamount = 0;
                player.expToLevel *= 1.25;
                lvlscore *= lvlscoremultiplier;
                score += Math.floor(lvlscore);
                
                // Spawn card selection
                spawnCards(player);
            }

            if (score > maxScore) {
                maxScore = score;
            }
        });
    } else {
        // Draw bullets and monsters but no update
        bulletsOnScreen.forEach((b) => {
            b.draw(ctx, CameraMan);
        });
        
        MonsterOnScreen.forEach((m) => {
            m.draw(ctx, CameraMan);
        });
    }

    //Draw UI
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 60, 60);
    ctx.fillText(`Wave: ${waveManager.getCurrentWave()}`, 60, 110);
    drawStats(player);
    drawExpBar(player);
    drawhpBar(player);
    
    
    player.draw(ctx, CameraMan);
    
    // Draw cards if spawned
    if (CardsOnScreen.length > 0) {
        drawCards(ctx);
    }
    
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
        player.dmg = 3; // reset damage
        player.hp = player.baseHp; // reset hp to base hp
    }
        

    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener("resize", canvasResize);
