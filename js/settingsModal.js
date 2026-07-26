import { CONFIG } from './config.js';

export class SettingsModal {
    constructor(onSettingsChange) {
        this.onSettingsChange = onSettingsChange;
        this.modalElement = document.getElementById('settings-modal');
        this.openButton = document.getElementById('settings-btn');
        this.closeButton = document.getElementById('close-settings-btn');
        
        this.speedButtons = document.querySelectorAll('.speed-option');
        this.directionButtons = document.querySelectorAll('.direction-option');
        this.colorButtons = document.querySelectorAll('.ball-color-option');

        this.currentSpeedPreset = localStorage.getItem('zigzag_speed_preset') || CONFIG.DEFAULT_SPEED_PRESET;
        this.currentDirectionMode = localStorage.getItem('zigzag_direction_mode') || CONFIG.DEFAULT_DIRECTION_MODE;
        this.currentBallColor = localStorage.getItem('zigzag_ball_color') || CONFIG.DEFAULT_BALL_COLOR;

        this.initEvents();
        this.updateActiveUI();
        this.applySettings();
    }

    initEvents() {
        this.openButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.open();
        });

        this.closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close();
        });

        this.speedButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setSpeedPreset(btn.dataset.speed);
            });
        });

        this.directionButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setDirectionMode(btn.dataset.direction);
            });
        });

        this.colorButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setBallColor(btn.dataset.color);
            });
        });
    }

    setSpeedPreset(presetKey) {
        if (!CONFIG.SPEED_PRESETS[presetKey]) return;
        this.currentSpeedPreset = presetKey;
        localStorage.setItem('zigzag_speed_preset', presetKey);
        this.updateActiveUI();
        this.applySettings();
    }

    setDirectionMode(dirKey) {
        if (!CONFIG.DIRECTION_MODES[dirKey]) return;
        this.currentDirectionMode = dirKey;
        localStorage.setItem('zigzag_direction_mode', dirKey);
        this.updateActiveUI();
        this.applySettings();
    }

    setBallColor(hexColor) {
        this.currentBallColor = hexColor;
        localStorage.setItem('zigzag_ball_color', hexColor);
        this.updateActiveUI();
        this.applySettings();
    }

    updateActiveUI() {
        this.speedButtons.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.speed === this.currentSpeedPreset);
        });

        this.directionButtons.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.direction === this.currentDirectionMode);
        });

        this.colorButtons.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.color === this.currentBallColor);
        });
    }

    applySettings() {
        const speedPreset = CONFIG.SPEED_PRESETS[this.currentSpeedPreset];
        const dirMode = CONFIG.DIRECTION_MODES[this.currentDirectionMode];

        if (this.onSettingsChange && speedPreset && dirMode) {
            this.onSettingsChange({
                speedPreset,
                directionMode: dirMode,
                ballColor: this.currentBallColor
            });
        }
    }

    open() {
        this.modalElement.style.display = 'flex';
    }

    close() {
        this.modalElement.style.display = 'none';
    }

    isOpen() {
        return this.modalElement.style.display === 'flex';
    }
}