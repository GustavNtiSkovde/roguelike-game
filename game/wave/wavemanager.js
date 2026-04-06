import { spawnMob } from "../monsters/mobspawner.js";
import { MonsterOnScreen } from "../objectlists.js";

class WaveManager {
    constructor() {
        this.currentWave = 1;
        this.mobsSpawnedThisWave = 0;
        this.mobsPerWave = 5;
        this.lastSpawnTime = 0;
        this.spawnInterval = 1000; // 1 second between spawns
        this.waveDelay = 3000; // 3 second delay
        this.waveStartTime = 0;
        this.waveActive = true;
    }


    getMobsForWave(waveNumber) {
        return 5 + (waveNumber - 1) * 3;
    }

    update(cameraMan) {
        // End wave
        if (MonsterOnScreen.length === 0 && this.waveActive && this.mobsSpawnedThisWave > 0) {
            this.endWave();
            return;
        }

        // Check for wave delay
        if (!this.waveActive) {
            const now = Date.now();
            if (now - this.waveStartTime > this.waveDelay) {
                this.startWave();
            }
            return;
        }

        // Spawn mobs
        const now = Date.now();
        const totalMobsThisWave = this.getMobsForWave(this.currentWave);

        if (
            this.mobsSpawnedThisWave < totalMobsThisWave &&
            now - this.lastSpawnTime > this.spawnInterval
        ) {
            spawnMob(cameraMan);
            this.mobsSpawnedThisWave++;
            this.lastSpawnTime = now;
        }
    }

    startWave() {
        this.waveActive = true;
        this.mobsSpawnedThisWave = 0;
        this.lastSpawnTime = Date.now();
    }

    endWave() {
        this.waveActive = false;
        this.waveStartTime = Date.now();
        this.currentWave++;
    }

    getCurrentWave() {
        return this.currentWave;
    }

    isWaveActive() {
        return this.waveActive;
    }

    getMobsRemaining() {
        return this.getMobsForWave(this.currentWave) - this.mobsSpawnedThisWave;
    }
}

export const waveManager = new WaveManager();
