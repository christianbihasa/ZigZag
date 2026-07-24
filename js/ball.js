import * as THREE from 'three';
import { CONFIG } from './config.js';

export class Ball {
    constructor(scene) {
        this.scene = scene;
        this.geometry = new THREE.SphereGeometry(CONFIG.BALL_RADIUS, 32, 32);
        this.material = new THREE.MeshPhongMaterial({ color: CONFIG.COLORS.BALL });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);

        const defaultPreset = CONFIG.SPEED_PRESETS[CONFIG.DEFAULT_SPEED_PRESET];
        const defaultDir = CONFIG.DIRECTION_MODES[CONFIG.DEFAULT_DIRECTION_MODE];
        
        this.baseSpeed = defaultPreset.initial;
        this.acceleration = defaultPreset.accel;
        this.xSign = defaultDir.xSign;
        this.zSign = defaultDir.zSign;
        
        this.direction = 'z';
        this.speed = this.baseSpeed;

        this.reset();
    }

    setSpeedConfig(initialSpeed, accel) {
        this.baseSpeed = initialSpeed;
        this.acceleration = accel;
        this.speed = this.baseSpeed;
    }

    setDirectionVector(xSign, zSign) {
        this.xSign = xSign;
        this.zSign = zSign;
    }

    toggleDirection() {
        this.direction = (this.direction === 'x') ? 'z' : 'x';
        this.speed += this.acceleration;
    }

    updatePosition() {
        if (this.direction === 'x') {
            this.mesh.position.x += this.speed * this.xSign;
        } else {
            this.mesh.position.z += this.speed * this.zSign;
        }
    }

    animateFall() {
        if (this.mesh.position.y > -15) {
            this.mesh.position.y -= 0.25;
        }
    }

    getPosition() {
        return this.mesh.position;
    }

    reset() {
        this.mesh.position.set(0, CONFIG.BALL_RADIUS, 0);
        this.direction = 'z';
        this.speed = this.baseSpeed;
    }
}