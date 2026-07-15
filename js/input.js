export class InputManager {
    constructor(onAction) {
        this.onAction = onAction;
        this.initListeners();
    }

    initListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                this.onAction();
            }
        });

        window.addEventListener('pointerdown', (event) => {
            if (event.target.tagName !== 'BUTTON') {
                this.onAction();
            }
        });
    }
}