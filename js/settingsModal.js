import { CONFIG } from './config.js';

export class SettingsModal {
    constructor(onSettingsChange) {
        this.onSettingsChange = onSettingsChange;
        this.modalElement = document.getElementById('settings-modal');
        this.openButton = document.getElementById('settings-btn');
        this.closeButton = document.getElementById('close-settings-btn');
        this.speedButtons = document.querySelectorAll('.speed-option');

        // Retrieve persisted preference or fallback to default
        this.currentSpeedPreset = localStorage.getItem('zigzag_speed_preset') || CONFIG.DEFAULT_SPEED_PRESET;

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
                const presetKey = btn.dataset.speed;
                this.setSpeedPreset(presetKey);
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

    updateActiveUI() {
        this.speedButtons.forEach((btn) => {
            if (btn.dataset.speed === this.currentSpeedPreset) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    applySettings() {
        const preset = CONFIG.SPEED_PRESETS[this.currentSpeedPreset];
        if (this.onSettingsChange && preset) {
            this.onSettingsChange(preset);
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