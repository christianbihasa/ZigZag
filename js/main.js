import * as THREE from 'three';
import { CONFIG } from './config.js';
import { CameraManager } from './camera.js';
import { InputManager } from './input.js';
import { PathManager } from './pathManager.js';
import { Ball } from './ball.js';
import { IntroModal } from './introModal.js';
import { SettingsModal } from './settingsModal.js';
import { ThemeManager } from './themeManager.js';

class Game {
    constructor() {
        this.score = 0;
        this.isModalActive = true;
        this.isGameStarted = false;
        this.isGameOver = false;

        this.currentDirectionKey = localStorage.getItem('zigzag_direction_mode') || CONFIG.DEFAULT_DIRECTION_MODE;

        this.initDOM();
        this.initScene();
        this.initEntities();
        this.initEvents();
        this.updateHighScoreDisplay();
        
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    initDOM() {
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('best-score');
        this.gameOverBox = document.getElementById('gameover');
        this.finalScoreElement = document.getElementById('final-score');
        this.bestScoreGameOverElement = document.getElementById('best-score-gameover');
        this.restartButton = document.getElementById('restart-btn');

        this.restartButton.addEventListener('click', () => this.restart());
    }

    getHighScore(dirKey = this.currentDirectionKey) {
        return parseInt(localStorage.getItem(`zigzag_highscore_${dirKey}`) || '0', 10);
    }

    saveHighScore(newScore, dirKey = this.currentDirectionKey) {
        localStorage.setItem(`zigzag_highscore_${dirKey}`, newScore);
    }

    updateHighScoreDisplay() {
        const bestScore = this.getHighScore();
        if (this.bestScoreElement) {
            this.bestScoreElement.innerText = `BEST: ${bestScore}`;
        }
        if (this.bestScoreGameOverElement) {
            this.bestScoreGameOverElement.innerText = `Best: ${bestScore}`;
        }
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(CONFIG.COLORS.BACKGROUND);

        this.cameraManager = new CameraManager();

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 10);
        dirLight.castShadow = true;
        this.scene.add(dirLight);
    }

    initEntities() {
        this.ball = new Ball(this.scene);
        this.pathManager = new PathManager(this.scene);
        
        this.themeManager = new ThemeManager(this.scene, this.pathManager);
        
        this.introModal = new IntroModal(() => {
            this.isModalActive = false;
        });

        this.settingsModal = new SettingsModal((settings) => {
            this.ball.setSpeedConfig(settings.speedPreset.initial, settings.speedPreset.accel);
            
            this.ball.setDirectionVector(settings.directionMode.xSign, settings.directionMode.zSign);
            this.pathManager.setDirectionVector(settings.directionMode.xSign, settings.directionMode.zSign);
            
            this.ball.setColor(settings.ballColor);

            if (settings.directionKey) {
                this.currentDirectionKey = settings.directionKey;
                this.updateHighScoreDisplay();
            }

            this.restart();
        });
    }

    initEvents() {
        this.inputManager = new InputManager(() => this.handleAction());
        window.addEventListener('resize', () => this.onWindowResize());
    }

    handleAction() {
        if (this.isModalActive || this.settingsModal.isOpen() || this.isGameOver) return;

        if (!this.isGameStarted) {
            this.isGameStarted = true;
            return;
        }

        this.ball.toggleDirection();
        this.score++;
        this.scoreElement.innerText = this.score;

        // Update high score live if current score exceeds saved best
        if (this.score > this.getHighScore()) {
            this.saveHighScore(this.score);
            this.updateHighScoreDisplay();
        }

        this.themeManager.updateScore(this.score);
    }

    triggerGameOver() {
        this.isGameOver = true;
        
        if (this.score > this.getHighScore()) {
            this.saveHighScore(this.score);
        }
        
        this.updateHighScoreDisplay();
        this.finalScoreElement.innerText = `Score: ${this.score}`;
        this.gameOverBox.style.display = 'flex';
    }

    restart() {
        this.score = 0;
        this.isGameStarted = false;
        this.isGameOver = false;
        this.scoreElement.innerText = '0';
        this.gameOverBox.style.display = 'none';

        this.updateHighScoreDisplay();
        this.ball.reset();
        this.cameraManager.reset();
        this.pathManager.reset();
        this.themeManager.reset();
    }

    onWindowResize() {
        this.cameraManager.handleResize();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate);

        this.themeManager.update();

        if (this.isGameStarted && !this.isGameOver) {
            this.ball.updatePosition();
            const ballPos = this.ball.getPosition();

            if (!this.pathManager.isBallOnPlatform(ballPos)) {
                this.triggerGameOver();
            } else {
                this.pathManager.update(ballPos);
                this.cameraManager.updatePosition(ballPos);
            }
        } else if (this.isGameOver) {
            this.ball.animateFall();
        }

        if (!this.isGameStarted) {
            this.cameraManager.updatePosition(this.ball.getPosition());
        }

        this.renderer.render(this.scene, this.cameraManager.camera);
    }
}

new Game();