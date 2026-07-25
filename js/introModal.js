export class IntroModal {
    constructor(onDismiss) {
        this.onDismiss = onDismiss;
        this.modalElement = document.getElementById('intro-modal');
        this.closeButton = document.getElementById('start-game-btn');
        
        // Save bound event handler reference so removeEventListener works properly
        this.boundKeyDown = this.handleKeyDown.bind(this);

        this.initEvents();
    }

    initEvents() {
        // Handle explicit button confirmation
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from triggering a game action
                this.dismiss();
            });
        }

        // Allow pressing Enter or Spacebar to dismiss the modal
        window.addEventListener('keydown', this.boundKeyDown);
    }

    handleKeyDown(event) {
        if (this.modalElement && this.modalElement.style.display !== 'none') {
            if (event.code === 'Enter' || event.code === 'Space') {
                event.preventDefault();
                event.stopPropagation(); // Stop Spacebar from triggering InputManager in the same frame
                this.dismiss();
            }
        }
    }

    dismiss() {
        if (this.modalElement) {
            this.modalElement.style.display = 'none';
        }

        // Unbind key listener cleanly
        window.removeEventListener('keydown', this.boundKeyDown);
        
        // Notify the main engine on the next frame so the dismiss keypress isn't read as a game move
        if (this.onDismiss) {
            setTimeout(() => {
                this.onDismiss();
            }, 0);
        }
    }
}