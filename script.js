class Stopwatch {
    constructor() {
        // DOM elements
        this.timeDisplay = document.getElementById('timeDisplay');
        this.startStopBtn = document.getElementById('startStopBtn');
        this.resetBtn = document.getElementById('resetBtn');

        // Stopwatch state
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.animationFrame = null;

        // Initialize event listeners
        this.initEventListeners();
    }

    initEventListeners() {
        // Button event listeners
        this.startStopBtn.addEventListener('click', () => this.toggleStopwatch());
        this.resetBtn.addEventListener('click', () => this.reset());

        // Keyboard event listeners
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Prevent accidental form submission or page reload
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
            }
        });
    }

    handleKeydown(event) {
        // Ignore if user is typing in an input field
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.code) {
            case 'Space':
                event.preventDefault();
                this.toggleStopwatch();
                break;
            case 'KeyR':
                if (!this.resetBtn.disabled) {
                    this.reset();
                }
                break;
        }
    }

    toggleStopwatch() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

    start() {
        this.isRunning = true;
        this.startTime = performance.now() - this.elapsedTime;
        
        // Update UI
        this.startStopBtn.textContent = 'Stop';
        this.startStopBtn.classList.add('stop');
        this.startStopBtn.setAttribute('aria-label', 'Stop stopwatch');
        this.resetBtn.disabled = true;
        this.timeDisplay.classList.add('running');

        // Start the update loop
        this.updateTime();
    }

    stop() {
        this.isRunning = false;
        
        // Cancel the animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // Update UI
        this.startStopBtn.textContent = 'Start';
        this.startStopBtn.classList.remove('stop');
        this.startStopBtn.setAttribute('aria-label', 'Start stopwatch');
        this.resetBtn.disabled = false;
        this.timeDisplay.classList.remove('running');
    }

    reset() {
        this.isRunning = false;
        this.elapsedTime = 0;

        // Cancel the animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // Update display
        this.updateDisplay(0);

        // Reset UI
        this.startStopBtn.textContent = 'Start';
        this.startStopBtn.classList.remove('stop');
        this.startStopBtn.setAttribute('aria-label', 'Start stopwatch');
        this.resetBtn.disabled = true;
        this.timeDisplay.classList.remove('running');
    }

    updateTime() {
        if (!this.isRunning) return;

        this.elapsedTime = performance.now() - this.startTime;
        this.updateDisplay(this.elapsedTime);

        // Request next frame
        this.animationFrame = requestAnimationFrame(() => this.updateTime());
    }

    updateDisplay(milliseconds) {
        const time = this.formatTime(milliseconds);
        this.timeDisplay.textContent = time;
    }

    formatTime(milliseconds) {
        const totalMs = Math.floor(milliseconds);
        const ms = totalMs % 1000;
        const totalSeconds = Math.floor(totalMs / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
    }
}

// Initialize the stopwatch when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
    
    // Add some helpful console messages for developers
    console.log('Stopwatch initialized successfully!');
    console.log('Keyboard shortcuts:');
    console.log('  Space - Start/Stop');
    console.log('  R - Reset');
});

// Add service worker registration for offline functionality (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Service worker file would need to be created separately
        // This is just a placeholder for future enhancement
        console.log('Service Worker support detected');
    });
}

// Add visibility change handler to pause when tab is not visible (optional enhancement)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Tab hidden - stopwatch continues running in background');
    } else {
        console.log('Tab visible - stopwatch display updated');
    }
});

// Export for potential testing (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Stopwatch;
}
