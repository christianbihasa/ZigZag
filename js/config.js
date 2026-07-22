export const CONFIG = {
    BLOCK_SIZE: 2,
    
    SPEED_PRESETS: {
        slow: {
            label: 'Slow',
            initial: 0.055,
            accel: 0.0001
        },
        normal: {
            label: 'Normal',
            initial: 0.085,
            accel: 0.0002
        },
        fast: {
            label: 'Fast',
            initial: 0.12,
            accel: 0.00035
        }
    },
    DEFAULT_SPEED_PRESET: 'normal',

    // --- Dynamic Palette Shifts Settings ---
    PALETTE_SHIFT_INTERVAL: 15,
    COLOR_TRANSITION_SPEED: 0.035,
    PALETTES: [
        { BACKGROUND: 0xb2ebf2, BLOCK: 0x00bcd4 }, // Default Soft Cyan
        { BACKGROUND: 0xf8bbd0, BLOCK: 0xe91e63 }, // Vibrant Rose / Magenta
        { BACKGROUND: 0xd1c4e9, BLOCK: 0x673ab7 }, // Deep Violet / Purple
        { BACKGROUND: 0xc8e6c9, BLOCK: 0x4caf50 }, // Fresh Mint / Emerald
        { BACKGROUND: 0xffecb3, BLOCK: 0xff9800 }, // Warm Sunset / Amber
        { BACKGROUND: 0x263238, BLOCK: 0x00e676 }  // Midnight Dark / Neon Green
    ],

    BALL_RADIUS: 0.5,
    CAMERA_DISTANCE: 10,
    CAMERA_LERP: 0.08,
    PATH_BUFFER_LENGTH: 25,
    CLEANUP_DISTANCE: 15,
    COLORS: {
        BACKGROUND: 0xb2ebf2,
        BALL: 0x212121,
        BLOCK: 0x00bcd4
    }
};