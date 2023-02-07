import React, { Ref, RefAttributes, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useQueuedState } from './reactUtils';

// [elementRef, animate, currentAnimation]
export type AnimatingRef<E extends Animatable> = Ref<E>

export const useAnimatingRef = <A extends string, E extends HTMLElement>(
    currentAnimation: A | null,
    onAnimationEnd?: (completedAnimation: A) => void,
): AnimatingRef<E> => {
    const elementRef = useRef<E>(null);

    // if we have a ref and an currentAnimation, animate the ref with the currentAnimation
    useEffect(() => {
        if (elementRef.current !== null) {
            const animations = JSON.parse(elementRef.current.getAttribute('data-animations') || "{}") as unknown as Record<A, AnimationInput>;
            if (currentAnimation !== null) {
                if (!animations || !animations[currentAnimation]) {
                    onAnimationEnd && onAnimationEnd(currentAnimation);
                    return;
                }
                try {
                    const { keyframes, options: { ...options } } = normalizedAnimation(
                        animations[currentAnimation]
                    );
                    const animation = elementRef.current.animate(keyframes, options);

                    const end = () => {
                        animation.commitStyles();
                        onAnimationEnd && onAnimationEnd(currentAnimation);
                    };
                    animation.onfinish = () => { end(); };
                    return () => {
                        if (animation.playState !== 'finished') {
                            end();
                        }
                    }
                } catch (err) {
                    if (process.env.NODE_ENV !== "production") {
                        const selector = elementRef.current.id || elementRef.current.className || null;
                        console.error(`Failed to animate ${elementRef.current}${selector ? `[${selector}]` : ''}.\nCheck your keyframes and options (${JSON.stringify(animations[currentAnimation])}).\n`, err)
                    }
                }
            }
        }
    }, [elementRef.current, currentAnimation, elementRef.current?.animations]);

    return elementRef
};

type Intrinsic = keyof JSX.IntrinsicElements;

type TagAttributes<T extends Intrinsic> = JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<infer A, any> ? A : never;
type TagElement<T extends Intrinsic> = JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<any, infer E> ? E : never;

export type AnimateProps<A extends string, T extends Intrinsic = "div"> = {
    as?: T;
    currentAnimation: A | null;
    onAnimationEnd?: (completedAnimation: A) => void;
} & Omit<TagAttributes<T>, 'onAnimationEnd'>;

const animate = <A extends string, T extends Intrinsic = "div">(
    props: AnimateProps<A, T>,
    ref?: React.ForwardedRef<T>
): React.ReactElement<any, any> => {
    const {
        as,
        currentAnimation,
        onAnimationEnd,
        animations,
        ...tagProps
    } = props;
    const Tag = as || "div";


    const animatingRef = useAnimatingRef(
        currentAnimation,
        onAnimationEnd
    );

    return (
        // @ts-ignore typescript's really not liking this
        <Tag       
            // @ts-ignore 
            ref={(element) => {
                // @ts-ignore
                animatingRef.current = element;
                if (ref) {
                    // @ts-ignore
                    ref.current = element;
                }
            }}
            data-animations={JSON.stringify(animations)}
            {...tagProps}
        />
    );
};

export const Animate = React.forwardRef(animate) as <A extends string, T extends Intrinsic = "div">(
    props: AnimateProps<A, T> & RefAttributes<TagElement<T>>
) => React.ReactElement<any, any>;

animate.displayName = "Animate";

const normalizedAnimation = (animation: AnimationInput): {
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
} => {
    if (Array.isArray(animation)) {
        return { keyframes: animation, options: {} };
    }
    const { keyframes, options } = animation;

    const normalizedOptions = typeof options === 'number'
        ? { duration: options }
        : options;

    return { keyframes, options: normalizedOptions };
}

export type AnimatedTransitionState<T, A extends string, E extends HTMLElement> = [
    T,
    (nextState: SetStateAction<T>, nextAnimationState: A | null) => void,
    Ref<E>,
    A | null,
];

export const toTransitionAnimation = (animation: AnimationInput): NormalizedAnimation => {
    const { keyframes, options } = normalizedAnimation(animation);
    return {
        keyframes: keyframes,
        options: { fill: 'forwards', ...options }
    }
}

export const useAnimatedTransitionState = <T, A extends string, E extends Animatable<A> & HTMLElement>(
    initialState?: T,
    initialAnimation: A = null,
    onAnimationEnd?: (completedAnimation: A) => void
): AnimatedTransitionState<T, A, E> => {
    const queuedState = useQueuedState(initialState);
    const [animationState, setAnimationState] = useState(initialAnimation);

    const dispatch = (completedAnimation: A) => {
        setAnimationState(null);
        queuedState.transitionAll();
        onAnimationEnd && onAnimationEnd(completedAnimation);
    };

    const elementRef = useAnimatingRef<A, E>(
        animationState,
        dispatch,
    );

    // when setting state, set the next animation
    const animatedSetState = (nextState: SetStateAction<T>, nextAnimation: A | null) => {
        setAnimationState(nextAnimation);
        queuedState.enqueue(nextState);
    };

    return [
        queuedState.current,
        animatedSetState,
        elementRef,
        animationState,
    ]
}

// [state, setState, transitioningElementRef, isTransitioning]
export type SimpleTransitioningState<T, E extends HTMLElement> = [
    T,
    (nextState: SetStateAction<T>) => void,
    Ref<E>,
    boolean,
]

export const useSimpleTransitioningState = <T, E extends Animatable<'transition'> & HTMLElement>(
    initialState?: T,
    initialTransitioning: boolean = false,
    onTransitionEnd?: () => void
): SimpleTransitioningState<T, E> => {
    const [
        state,
        animatedSetState,
        elementRef,
        animationState,
    ] = useAnimatedTransitionState<T, 'transition', E>(
        initialState,
        initialTransitioning ? 'transition' : null,
        onTransitionEnd
    );

    return [state, (action) => animatedSetState(action, 'transition'), elementRef, animationState !== null];
}

// [state, setState, transitioningElementRef, currentAnimation]
export type ToggleAnimations = 'togglingOn' | 'togglingOff';
export type AnimatedToggleState<E extends HTMLElement> = [
    boolean,
    () => void,
    Ref<E>,
    ToggleAnimations | null,
];

export const toToggleAnimations = (togglingOn: AnimationInput): Record<ToggleAnimations, AnimationInput> => {
    const { keyframes, options } = toTransitionAnimation(togglingOn);
    return {
        togglingOn: { keyframes, options },
        togglingOff: {
            keyframes: keyframes.slice().reverse(),
            options
        }
    };
};

export const useAnimatedToggle = <E extends Animatable<ToggleAnimations> & HTMLElement>(
    initialState?: boolean,
    initialAnimationState: ToggleAnimations = null,
): AnimatedToggleState<E> => {
    const [
        isToggled,
        animatedSetState,
        elementRef,
        isTransitioning
    ] = useAnimatedTransitionState<boolean, ToggleAnimations, E>(initialState, initialAnimationState);

    const nextAnimation = isToggled
        ? 'togglingOff'
        : 'togglingOn';

    const animateToggle = useCallback(
        () => animatedSetState((prev) => !prev, nextAnimation),
        [isToggled]
    );

    const currentAnimation = isTransitioning !== null
        ? nextAnimation
        : null;
    return [isToggled, animateToggle, elementRef, currentAnimation];
}
