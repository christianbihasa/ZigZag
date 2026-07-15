import { CONFIG } from './config.js';

export class CameraManager {
    constructor() {
        const aspect = window.innerWidth / window.innerHeight;
        const d = CONFIG.CAMERA_DISTANCE;

        this.camera = new THREE.OrthographicCamera(
            -d * aspect,
             d * aspect,
             d,
            -d,
             1,
             1000
        );

        this.initialPosition = new THREE.Vector3(20, 20, 20);
        this.camera.position.copy(this.initialPosition);
        this.camera.lookAt(0, 0, 0);
    }

    updatePosition(targetPosition) {
        const targetCamX = targetPosition.x + this.initialPosition.x;
        const targetCamZ = targetPosition.z + this.initialPosition.z;

        this.camera.position.x += (targetCamX - this.camera.position.x) * CONFIG.CAMERA_LERP;
        this.camera.position.z += (targetCamZ - this.camera.position.z) * CONFIG.CAMERA_LERP;
    }

    handleResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const d = CONFIG.CAMERA_DISTANCE;

        this.camera.left = -d * aspect;
        this.camera.right = d * aspect;
        this.camera.top = d;
        this.camera.bottom = -d;
        this.camera.updateProjectionMatrix();
    }

    reset() {
        this.camera.position.copy(this.initialPosition);
    }
}