import { CONFIG } from './config.js';

export class PathManager {
    constructor(scene) {
        this.scene = scene;
        this.activeBlocks = [];
        this.lastPosition = { x: 0, y: 0, z: 0 };
        this.blockGeometry = new THREE.BoxGeometry(
            CONFIG.BLOCK_SIZE, 
            3, 
            CONFIG.BLOCK_SIZE
        );
        this.blockMaterial = new THREE.MeshPhongMaterial({ 
            color: CONFIG.COLORS.BLOCK 
        });
    }

    createBlock(x, z) {
        const block = new THREE.Mesh(this.blockGeometry, this.blockMaterial);
        block.position.set(x, -1.5, z);
        block.receiveShadow = true;
        this.scene.add(block);
        this.activeBlocks.push(block);
    }

    extendPath() {
        const choice = Math.random() > 0.5 ? 'x' : 'z';
        if (choice === 'x') {
            this.lastPosition.x += CONFIG.BLOCK_SIZE;
        } else {
            this.lastPosition.z += CONFIG.BLOCK_SIZE;
        }
        this.createBlock(this.lastPosition.x, this.lastPosition.z);
    }

    generateInitialPath() {
        this.createBlock(0, 0);
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
        if (
            firstBlock.position.x < ballPosition.x - CONFIG.CLEANUP_DISTANCE &&
            firstBlock.position.z < ballPosition.z - CONFIG.CLEANUP_DISTANCE
        ) {
            const removedBlock = this.activeBlocks.shift();
            this.scene.remove(removedBlock);
        }
    }

    isBallOnPlatform(ballPosition) {
        const halfSize = CONFIG.BLOCK_SIZE / 2;
        for (let block of this.activeBlocks) {
            if (
                ballPosition.x >= block.position.x - halfSize &&
                ballPosition.x <= block.position.x + halfSize &&
                ballPosition.z >= block.position.z - halfSize &&
                ballPosition.z <= block.position.z + halfSize
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