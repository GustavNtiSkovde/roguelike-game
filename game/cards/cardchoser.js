import { CardsOnScreen, MonsterOnScreen } from "../objectlists.js"
import { Card } from "../cards/card.js";
import { cardTemplates } from "./cardlist.js";
import { Canvas } from "../canvasctx.js";
import { player, setPlayerLevelUp } from "../gameloop.js";
let currentPlayer = null;

export function spawnCards(player) {
    currentPlayer = player;
    CardsOnScreen.length = 0;
    
    const cardTemplateArray = Object.values(cardTemplates);
    const cardGap = 300; // Space between cards
    const position = Canvas.width / 2;
    const positions = [
        position - cardGap,
        position,
        position + cardGap
    ];
    
    for (let i = 0; i < 3; i++) {
        const tpl = cardTemplateArray[Math.floor(Math.random() * cardTemplateArray.length)];
        const card = new Card(tpl.title, tpl.effect, tpl.imgsrc);
        card.x = positions[i];
        card.y = Canvas.height / 2;
        CardsOnScreen.push(card);
    }
    
    window.addEventListener("click", selectCard);
}

function selectCard(event) {
    const rect = Canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    for (let card of CardsOnScreen) {
        if (card.isClicked(mouseX, mouseY)) {
            card.effect(currentPlayer, MonsterOnScreen);
            CardsOnScreen.length = 0;
            window.removeEventListener("click", selectCard);
            setPlayerLevelUp(false);
            console.log("Time unpaused");
            break;
        }
    }
}

export function drawCards(ctx) {
    for (let card of CardsOnScreen) {
        card.draw(ctx);
    }
}

export function areCardsActive() {
    return CardsOnScreen.length > 0;
}