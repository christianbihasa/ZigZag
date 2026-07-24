export const CONFIG = {
    BLOCK_SIZE: 2,
    
    SPEED_PRESETS: {
        slow: { label: 'Slow', initial: 0.055, accel: 0.0001 },
        normal: { label: 'Normal', initial: 0.085, accel: 0.0002 },
        fast: { label: 'Fast', initial: 0.12, accel: 0.00035 }
    },
    DEFAULT_SPEED_PRESET: 'normal',

    // --- Direction Mode Presets ---
    DIRECTION_MODES: {
        down: {
            label: 'Down (Classic)',
            xSign: 1,
            zSign: 1
        },
        up: {
            label: 'Up',
            xSign: -1,
            zSign: -1
        },
        right: {
            label: 'Right',
            xSign: 1,
            zSign: -1
        }
    },
    DEFAULT_DIRECTION_MODE: 'down',

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