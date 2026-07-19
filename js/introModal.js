export class IntroModal {
    constructor(onDismiss) {
        this.onDismiss = onDismiss;
        this.modalElement = document.getElementById('intro-modal');
        this.closeButton = document.getElementById('start-game-btn');
        
        this.initEvents();
    }

    initEvents() {
        // Handle explicit button confirmation
        this.closeButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from instantly triggering a game turn
            this.dismiss();
        });

        // Allow pressing Enter or Spacebar to dismiss the modal gracefully
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        if (this.modalElement.style.display !== 'none') {
            if (event.code === 'Enter' || event.code === 'Space') {
                event.preventDefault();
                this.dismiss();
            }
        }
    }

    dismiss() {
        this.modalElement.style.display = 'none';
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Notify the main engine that the game is ready for interaction
        if (this.onDismiss) {
            this.onDismiss();
        }
    }
}