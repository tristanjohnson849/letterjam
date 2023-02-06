import { mapValues } from 'lodash';
import React, { Ref, SetStateAction, useCallback, useDebugValue, useEffect, useRef, useState } from 'react';
import { useControllableState, useQueuedState } from './reactUtils';


// [elementRef, animate, currentAnimation]
export type AnimationHookResponse<A extends string, E extends HTMLElement> = [
    Ref<E>,
    (nextAnimation: A) => void,
    A | null,
];

export interface NormalizedAnimation {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
}

export type AnimationOptions = number | KeyframeAnimationOptions;

export type AnimationInput = Keyframe[] | NormalizedAnimation | {
    keyframes: Keyframe[],
    options: AnimationOptions
};

export const useAnimation = <A extends string, E extends HTMLElement>(
    controllingState?: A,
    animations?: Record<A, AnimationInput>,
    initialAnimation: A = null,
    onAnimationEnd?: (completedAnimation: A) => void,
): AnimationHookResponse<A, E> => {
    const [animationState, setAnimationState] = useControllableState<A>(controllingState, initialAnimation);
    const elementRef = useRef<E>(null);

    // if we have a ref and an animationState, animate the ref with the current animation
    useEffect(() => {
        if (elementRef.current !== null && animationState !== null) {

            if (!animations[animationState]) {
                setAnimationState(null);
                onAnimationEnd && onAnimationEnd(animationState);
                return;
            }
            try {
                const { keyframes, options: { ...options } } = normalizedAnimation(animations[animationState]);
                const animation = elementRef.current.animate(keyframes, options);

                const end = () => {
                    animation.commitStyles();
                    setAnimationState(null);
                    onAnimationEnd && onAnimationEnd(animationState);
                };
                animation.onfinish = end;
                return () => {
                    if (animation.playState !== 'finished') {
                        animation.finish();
                    }
                }
            } catch (err) {
                if (process.env.NODE_ENV !== "production") {
                    const selector = elementRef.current.id || elementRef.current.className || null;
                    console.error(`Failed to animate ${elementRef.current.localName}${selector ? `[${selector}]` : ''}.\nCheck your keyframes and options (${JSON.stringify(animations[animationState])}).\n`, err)
                }
            }
        }
    }, [elementRef, animationState, JSON.stringify(animations)]);

    return [
        elementRef,
        (newAnimationState: A) => {
            if (newAnimationState !== animationState) {
                setAnimationState(newAnimationState);
            }
        },
        animationState,
    ]
};

export interface AnimatableProps<A extends string, T extends keyof JSX.IntrinsicElements = "div"> {
    as?: T;
    currentAnimation: A | null;
    animations: Record<A, AnimationInput>;
    initialAnimation?: A;
    onAnimationEnd?: (completedAnimation: A) => void;
}

export const Animatable = <A extends string, T extends keyof JSX.IntrinsicElements = "div">({
    // @ts-ignore -- can't find a way to assert as will be div in default
    as: Tag = "div",
    animations,
    currentAnimation,
    initialAnimation,
    onAnimationEnd,
    ...tagProps
}: AnimatableProps<A, T> & React.ComponentProps<T>): React.ReactElement<any, any> | null => {
    const [tagRef] = useAnimation(
        currentAnimation,
        animations,
        initialAnimation || null,
        onAnimationEnd
    )
    // @ts-ignore -- can't find a way to declare JSX.IntrinsicElements as tags
    return <Tag ref={tagRef} {...tagProps} />;
}

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

const toTransitionAnimation = (animation: AnimationInput): NormalizedAnimation => {
    const { keyframes, options } = normalizedAnimation(animation);
    return {
        keyframes: keyframes,
        options: { fill: 'forwards', ...options }
    }
}

export const useAnimatedTransitionState = <T, A extends string, E extends HTMLElement>(
    animations: Record<A, AnimationInput>,
    initialState?: T,
    initialAnimation: A = null,
    onAnimationEnd?: (completedAnimation: A) => void
): AnimatedTransitionState<T, A, E> => {
    const queuedState = useQueuedState(initialState);

    const transitionAnimations: Record<A, AnimationInput> = mapValues(animations, toTransitionAnimation);

    const dispatch = (completedAnimation: A) => {
        onAnimationEnd && onAnimationEnd(completedAnimation);
        queuedState.transitionAll();
    };

    const [elementRef, animate, currentAnimation] = useAnimation<A, E>(
        undefined,
        transitionAnimations,
        initialAnimation,
        dispatch,
    );

    // when setting state, set the next animation
    const animatedSetState = (nextState: SetStateAction<T>, nextAnimation: A | null) => {
        animate(nextAnimation);
        queuedState.enqueue(nextState);
    };

    return [
        queuedState.current,
        animatedSetState,
        elementRef,
        currentAnimation,
    ]
}

// [state, setState, transitioningElementRef, isTransitioning]
export type SimpleTransitioningState<T, E extends HTMLElement> = [
    T,
    (nextState: SetStateAction<T>) => void,
    Ref<E>,
    boolean,
]

export const useSimpleTransitioningState = <T, E extends HTMLElement>(
    animation: AnimationInput,
    initialState?: T,
    initialTransitioning: boolean = false,
    onTransitionEnd?: () => void
): SimpleTransitioningState<T, E> => {
    const [
        state,
        animatedSetState,
        elementRef,
        animationState,
    ] = useAnimatedTransitionState<T, 'a', E>(
        { a: animation },
        initialState,
        initialTransitioning ? 'a' : null,
        onTransitionEnd
    );

    return [state, (action) => animatedSetState(action, 'a'), elementRef, animationState !== null];
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

export const useAnimatedToggle = <E extends HTMLElement>(
    animation: AnimationInput,
    initialState?: boolean,
    initialAnimationState: ToggleAnimations = null,
): AnimatedToggleState<E> => {
    const [
        isToggled,
        animatedSetState,
        elementRef,
        isTransitioning
    ] = useAnimatedTransitionState<boolean, ToggleAnimations, E>(toToggleAnimations(animation), initialState, initialAnimationState);

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
