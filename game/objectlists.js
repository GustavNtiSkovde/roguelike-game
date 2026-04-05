import { playbutton } from "./menutogame/menubuttons.js";
import { Player } from "./characters/player.js";
import { Camera } from "./camera.js";
import { Canvas } from "./canvasctx.js";
import { Bullet } from "./bullets/bullet.js";

Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight;

export const CameraMan = new Camera(0, 0, 800, 600);

export const MenuButtonList = [
    new playbutton(Canvas.width / 2, Canvas.height / 2, "./game/pictures/menu/newgame.png")
]

export const CharacterList = [
    new Player(400, 300, 100, 100, 100, "Player", "./game/Pictures/Characters/player.png")
]

export let bulletsOnScreen = [

]

export let MonsterOnScreen = [
    
]

export let CardsOnScreen = [

]