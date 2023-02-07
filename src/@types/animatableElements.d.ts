interface NormalizedAnimation {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
}

type AnimationOptions = number | KeyframeAnimationOptions;

type AnimationInput = Keyframe[] | NormalizedAnimation | {
    keyframes: Keyframe[],
    options: AnimationOptions
};

interface Animatable<AnimationStates extends string = string> {
    animations?: Record<AnimationStates, AnimationInput>;
}

declare namespace React {
    interface HTMLAttributes<T> {
        animations?: Record<string, AnimationInput>
    }
}
