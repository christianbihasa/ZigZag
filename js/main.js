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

        this.initDOM();
        this.initScene();
        this.initEntities();
        this.initEvents();
        
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    initDOM() {
        this.scoreElement = document.getElementById('score');
        this.gameOverBox = document.getElementById('gameover');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartButton = document.getElementById('restart-btn');

        this.restartButton.addEventListener('click', () => this.restart());
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

        // Settings callback applies speed and direction mode updates
        this.settingsModal = new SettingsModal((settings) => {
            this.ball.setSpeedConfig(settings.speedPreset.initial, settings.speedPreset.accel);
            
            this.ball.setDirectionVector(settings.directionMode.xSign, settings.directionMode.zSign);
            this.pathManager.setDirectionVector(settings.directionMode.xSign, settings.directionMode.zSign);
            
            this.restart();
        });

        this.pathManager.generateInitialPath();
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

        this.themeManager.updateScore(this.score);
    }

    triggerGameOver() {
        this.isGameOver = true;
        this.finalScoreElement.innerText = `Score: ${this.score}`;
        this.gameOverBox.style.display = 'block';
    }

    restart() {
        this.score = 0;
        this.isGameStarted = false;
        this.isGameOver = false;
        this.scoreElement.innerText = '0';
        this.gameOverBox.style.display = 'none';

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