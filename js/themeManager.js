import * as THREE from 'three';
import { CONFIG } from './config.js';

export class ThemeManager {
    constructor(scene, pathManager) {
        this.scene = scene;
        this.pathManager = pathManager;
        
        this.currentPaletteIndex = 0;
        
        // Target colors initialized to default palette
        const initialPalette = CONFIG.PALETTES[0];
        this.targetBgColor = new THREE.Color(initialPalette.BACKGROUND);
        this.targetBlockColor = new THREE.Color(initialPalette.BLOCK);
    }

    updateScore(score) {
        if (score === 0) return;

        // Determine which palette index corresponds to the current score
        const targetIndex = Math.floor(score / CONFIG.PALETTE_SHIFT_INTERVAL) % CONFIG.PALETTES.length;

        if (targetIndex !== this.currentPaletteIndex) {
            this.currentPaletteIndex = targetIndex;
            const nextPalette = CONFIG.PALETTES[this.currentPaletteIndex];
            
            // Set new color targets for lerping
            this.targetBgColor.set(nextPalette.BACKGROUND);
            this.targetBlockColor.set(nextPalette.BLOCK);
        }
    }

    update() {
        // Smoothly transition scene background color
        this.scene.background.lerp(this.targetBgColor, CONFIG.COLOR_TRANSITION_SPEED);
        
        // Smoothly transition shared platform material color
        this.pathManager.blockMaterial.color.lerp(this.targetBlockColor, CONFIG.COLOR_TRANSITION_SPEED);
    }

    reset() {
        this.currentPaletteIndex = 0;
        const initialPalette = CONFIG.PALETTES[0];
        
        // Snap directly back to default palette on game restart
        this.targetBgColor.set(initialPalette.BACKGROUND);
        this.targetBlockColor.set(initialPalette.BLOCK);
        
        this.scene.background.set(initialPalette.BACKGROUND);
        this.pathManager.blockMaterial.color.set(initialPalette.BLOCK);
    }
}