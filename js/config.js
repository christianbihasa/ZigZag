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