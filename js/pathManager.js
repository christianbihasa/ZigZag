import * as THREE from 'three';
import { CONFIG } from './config.js';

export class PathManager {
    constructor(scene) {
        this.scene = scene;
        this.activeBlocks = [];
        this.lastPosition = { x: 0, y: 0, z: 0 };
        
        const defaultDir = CONFIG.DIRECTION_MODES[CONFIG.DEFAULT_DIRECTION_MODE];
        this.xSign = defaultDir.xSign;
        this.zSign = defaultDir.zSign;
        
        this.blockGeometry = new THREE.BoxGeometry(
            CONFIG.BLOCK_SIZE, 
            3, 
            CONFIG.BLOCK_SIZE
        );
        
        this.startPlatformGeometry = new THREE.BoxGeometry(12, 3, 12);
        
        this.blockMaterial = new THREE.MeshPhongMaterial({ 
            color: CONFIG.COLORS.BLOCK 
        });
    }

    setDirectionVector(xSign, zSign) {
        this.xSign = xSign;
        this.zSign = zSign;
    }

    createBlock(x, z) {
        const block = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        block.position.set(x, -1.5, z);
        block.receiveShadow = true;
        block.isStartingPlatform = false;
        this.scene.add(block);
        this.activeBlocks.push(block);
    }

    extendPath() {
        const choice = Math.random() > 0.5 ? 'x' : 'z';
        if (choice === 'x') {
            this.lastPosition.x += CONFIG.BLOCK_SIZE * this.xSign;
        } else {
            this.lastPosition.z += CONFIG.BLOCK_SIZE * this.zSign;
        }
        this.createBlock(this.lastPosition.x, this.lastPosition.z);
    }

    clearBlocks() {
        for (let block of this.activeBlocks) {
            this.scene.remove(block);
        }
        this.activeBlocks = [];
    }

    generateInitialPath() {
        this.clearBlocks();
        const startPlatform = new THREE.Mesh(this.startPlatformGeometry, this.blockMaterial);
        startPlatform.position.set(0, -1.5, 0);
        startPlatform.receiveShadow = true;
        startPlatform.isStartingPlatform = true;
        
        this.scene.add(startPlatform);
        this.activeBlocks.push(startPlatform);

        this.lastPosition = { 
            x: 5 * this.xSign, 
            y: 0, 
            z: 5 * this.zSign 
        };

        for (let i = 0; i < CONFIG.PATH_BUFFER_LENGTH; i++) {
            this.extendPath();
        }
    }

    update(ballPosition) {
        if (this.activeBlocks.length === 0) return;

        const furthestBlock = this.activeBlocks[this.activeBlocks.length - 1];
        if (ballPosition.distanceTo(furthestBlock.position) < 30) {
            this.extendPath();
        }

        const firstBlock = this.activeBlocks[0];
        const cleanupThreshold = firstBlock.isStartingPlatform ? 24 : CONFIG.CLEANUP_DISTANCE;
        
        const pastX = (firstBlock.position.x - ballPosition.x) * this.xSign < -cleanupThreshold;
        const pastZ = (firstBlock.position.z - ballPosition.z) * this.zSign < -cleanupThreshold;

        if (pastX && pastZ) {
            const removedBlock = this.activeBlocks.shift();
            this.scene.remove(removedBlock);
            removedBlock.geometry.dispose();
        }
    }

    isBallOnPlatform(ballPosition) {
        for (let block of this.activeBlocks) {
            const currentBlockWidth = block.isStartingPlatform ? 12 : CONFIG.BLOCK_SIZE;
            const outerBoundTolerance = (currentBlockWidth / 2) + CONFIG.BALL_RADIUS;
            
            if (
                ballPosition.x >= block.position.x - outerBoundTolerance &&
                ballPosition.x <= block.position.x + outerBoundTolerance &&
                ballPosition.z >= block.position.z - outerBoundTolerance &&
                ballPosition.z <= block.position.z + outerBoundTolerance
            ) {
                return true;
            }
        }
        return false;
    }

    reset() {
        for (let block of this.activeBlocks) {
            this.scene.remove(block);
        }
        this.activeBlocks = [];
        this.lastPosition = { x: 0, y: 0, z: 0 };
        this.generateInitialPath();
    }
}