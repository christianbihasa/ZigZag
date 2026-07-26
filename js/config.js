export const CONFIG = {
    BLOCK_SIZE: 2,
    
    SPEED_PRESETS: {
        slow: { label: 'Slow', initial: 0.055, accel: 0.0001 },
        normal: { label: 'Normal', initial: 0.085, accel: 0.0002 },
        fast: { label: 'Fast', initial: 0.12, accel: 0.00035 }
    },
    DEFAULT_SPEED_PRESET: 'normal',

    DIRECTION_MODES: {
        down: { label: 'Down (Classic)', xSign: 1, zSign: 1 },
        up: { label: 'Up', xSign: -1, zSign: -1 },
        right: { label: 'Right', xSign: 1, zSign: -1 },
        left: { label: 'Left', xSign: -1, zSign: 1 }
    },
    DEFAULT_DIRECTION_MODE: 'down',

    // --- Ball Color Palette Options ---
    BALL_COLORS: [
        { id: 'classic', hex: 0x212121, css: '#212121', label: 'Classic Dark' },
        { id: 'gold', hex: 0xffd700, css: '#ffd700', label: 'Gold' },
        { id: 'crimson', hex: 0xff1744, css: '#ff1744', label: 'Crimson' },
        { id: 'cyan', hex: 0x00e5ff, css: '#00e5ff', label: 'Cyan' },
        { id: 'lime', hex: 0x76ff03, css: '#76ff03', label: 'Neon Lime' }
    ],
    DEFAULT_BALL_COLOR: '0x212121',

    PALETTE_SHIFT_INTERVAL: 15,
    COLOR_TRANSITION_SPEED: 0.035,
    PALETTES: [
        { BACKGROUND: 0xb2ebf2, BLOCK: 0x00bcd4 },
        { BACKGROUND: 0xf8bbd0, BLOCK: 0xe91e63 },
        { BACKGROUND: 0xd1c4e9, BLOCK: 0x673ab7 },
        { BACKGROUND: 0xc8e6c9, BLOCK: 0x4caf50 },
        { BACKGROUND: 0xffecb3, BLOCK: 0xff9800 },
        { BACKGROUND: 0x263238, BLOCK: 0x00e676 }
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