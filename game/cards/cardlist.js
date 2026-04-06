const increaseHp = 1.25;
export const cardTemplates = [
    {
        title: "Dmg increase",
        effect: (player, mobs) => { 
            player.dmg += 3; 
            // Increase maxHp of all active mobs permanently
            if (mobs && mobs.length > 0) {
                mobs.forEach(mob => {
                    mob.maxHp += 20;
                });
            }
        },
        imgsrc: "./game/pictures/cards/attackdmg.png"
    },
    {
        title: "Attack speed increase",
        effect: (player) => Math.floor(player.attackSpeed *= 1.25),
        imgsrc: "./game/pictures/cards/attackspeed.png" 
    },
    {
        title: "Hp increase",
        effect: (player) => Math.floor(player.maxHp *= increaseHp),
        imgsrc: "./game/pictures/cards/hpincrease.png" 
    },
    {
        title: "Hp heal",
        effect: (player) => { if (player.hp < player.maxHp) player.hp += 30; if (player.hp > player.maxHp) player.hp = player.maxHp; },
        imgsrc: "./game/pictures/cards/hpregen.png" 
    },
    {
        title: "Hp heal && increase",
        effect: (player) => { player.maxHp *= increaseHp; player.hp += 30; },
        imgsrc: "./game/pictures/cards/hpregenandincrease.png" 
    }
];

const keys = Object.keys(cardTemplates);

const randomKey = keys[Math.floor(Math.random() * keys.length)];

export const randomCard = cardTemplates[randomKey];