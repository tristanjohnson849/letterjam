interface NormalizedAnimation {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
}

type AnimationOptions = number | KeyframeAnimationOptions;

type AnimationInput = Keyframe[] | NormalizedAnimation | {
    keyframes: Keyframe[],
    options: AnimationOptions
};

interface StatefulAnimatable<AnimationStates extends string = string> {
    animations?: Record<AnimationStates, AnimationInput>;
}

declare namespace React {
    interface HTMLAttributes<T> {
        'data-animations'?: string
    }
}
