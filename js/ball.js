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

        this.direction = 'z';
        this.speed = CONFIG.INITIAL_SPEED;
        this.reset();
    }

    toggleDirection() {
        this.direction = (this.direction === 'x') ? 'z' : 'x';
        this.speed += CONFIG.ACCELERATION;
    }

    updatePosition() {
        if (this.direction === 'x') {
            this.mesh.position.x += this.speed;
        } else {
            this.mesh.position.z += this.speed;
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
        this.speed = CONFIG.INITIAL_SPEED;
    }
}