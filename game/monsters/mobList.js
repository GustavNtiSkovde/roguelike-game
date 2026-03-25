export const mobTemplates = {
    redMob: {  speed: 5, dmg: 5, imgsrc: "./game/pictures/characters/monster.png"},
    zonmbieMob: {  speed: 4, dmg: 6, imgsrc: "./game/pictures/characters/zombie.png"}
};

const keys = Object.keys(mobTemplates);

const randomKey = keys[Math.floor(Math.random() * keys.length)];

export const randomMob = mobTemplates[randomKey];